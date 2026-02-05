from fastapi import APIRouter, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionRequest
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path
from models.order import Order, OrderItem, CreateCheckoutRequest, PaymentTransaction
import logging

router = APIRouter(prefix="/api/payments", tags=["payments"])

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
orders_collection = db.orders
transactions_collection = db.payment_transactions

# Stripe configuration
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')

logger = logging.getLogger(__name__)

@router.post("/checkout")
async def create_checkout_session(request: CreateCheckoutRequest, http_request: Request):
    """Create a Stripe checkout session for the order"""
    
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    # Calculate totals on the server side (never trust frontend amounts)
    subtotal = sum(item.price * item.quantity for item in request.items)
    total = subtotal  # Add delivery fee if needed
    
    if total <= 0:
        raise HTTPException(status_code=400, detail="Invalid order total")
    
    # Create the order first
    order = Order(
        items=[item.dict() for item in request.items],
        subtotal=subtotal,
        total=total,
        customer_name=request.customer_name,
        customer_phone=request.customer_phone,
        customer_email=request.customer_email,
        order_type=request.order_type,
        delivery_address=request.delivery_address,
        notes=request.notes,
        status="pending",
        payment_status="initiated"
    )
    
    # Save order to database
    order_dict = order.dict()
    order_dict['created_at'] = order_dict['created_at'].isoformat()
    order_dict['updated_at'] = order_dict['updated_at'].isoformat()
    await orders_collection.insert_one(order_dict)
    
    # Setup Stripe checkout
    host_url = str(http_request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)
    
    # Build success and cancel URLs from frontend origin
    origin_url = request.origin_url.rstrip('/')
    success_url = f"{origin_url}/order-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/cart"
    
    # Create checkout session
    checkout_request = CheckoutSessionRequest(
        amount=float(total),
        currency="gbp",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "order_id": order.id,
            "customer_name": request.customer_name,
            "customer_phone": request.customer_phone,
            "order_type": request.order_type
        }
    )
    
    try:
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Update order with session ID
        await orders_collection.update_one(
            {"id": order.id},
            {"$set": {"stripe_session_id": session.session_id, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        
        # Create payment transaction record
        transaction = PaymentTransaction(
            order_id=order.id,
            session_id=session.session_id,
            amount=total,
            currency="gbp",
            status="initiated",
            payment_status="pending",
            metadata={"customer_name": request.customer_name}
        )
        
        transaction_dict = transaction.dict()
        transaction_dict['created_at'] = transaction_dict['created_at'].isoformat()
        transaction_dict['updated_at'] = transaction_dict['updated_at'].isoformat()
        await transactions_collection.insert_one(transaction_dict)
        
        return {
            "url": session.url,
            "session_id": session.session_id,
            "order_id": order.id
        }
        
    except Exception as e:
        logger.error(f"Stripe checkout error: {str(e)}")
        # Update order status to failed
        await orders_collection.update_one(
            {"id": order.id},
            {"$set": {"status": "failed", "payment_status": "failed", "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        raise HTTPException(status_code=500, detail=f"Failed to create checkout session: {str(e)}")


@router.get("/status/{session_id}")
async def get_payment_status(session_id: str, http_request: Request):
    """Get the status of a payment session"""
    
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    host_url = str(http_request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)
    
    try:
        status = await stripe_checkout.get_checkout_status(session_id)
        
        # Find the transaction and order
        transaction = await transactions_collection.find_one({"session_id": session_id}, {"_id": 0})
        
        if transaction:
            order_id = transaction.get("order_id")
            
            # Update based on payment status
            if status.payment_status == "paid":
                # Check if already processed to prevent double processing
                if transaction.get("status") != "paid":
                    await transactions_collection.update_one(
                        {"session_id": session_id},
                        {"$set": {"status": "paid", "payment_status": "paid", "updated_at": datetime.now(timezone.utc).isoformat()}}
                    )
                    await orders_collection.update_one(
                        {"id": order_id},
                        {"$set": {"status": "confirmed", "payment_status": "paid", "updated_at": datetime.now(timezone.utc).isoformat()}}
                    )
            elif status.status == "expired":
                await transactions_collection.update_one(
                    {"session_id": session_id},
                    {"$set": {"status": "expired", "payment_status": "expired", "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
                await orders_collection.update_one(
                    {"id": order_id},
                    {"$set": {"status": "cancelled", "payment_status": "expired", "updated_at": datetime.now(timezone.utc).isoformat()}}
                )
        
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency
        }
        
    except Exception as e:
        logger.error(f"Error checking payment status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to check payment status: {str(e)}")


@router.get("/order/{order_id}")
async def get_order(order_id: str):
    """Get order details"""
    order = await orders_collection.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
