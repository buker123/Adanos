from fastapi import APIRouter, Request, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import StripeCheckout
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path
import logging

router = APIRouter(tags=["webhooks"])

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
orders_collection = db.orders
transactions_collection = db.payment_transactions

STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')

logger = logging.getLogger(__name__)

@router.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        
        stripe_checkout = StripeCheckout(api_key=STRIPE_SECRET_KEY, webhook_url=webhook_url)
        
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        logger.info(f"Webhook event: {webhook_response.event_type}, session: {webhook_response.session_id}")
        
        # Handle the event
        if webhook_response.event_type == "checkout.session.completed":
            session_id = webhook_response.session_id
            
            # Find transaction
            transaction = await transactions_collection.find_one({"session_id": session_id})
            
            if transaction and transaction.get("status") != "paid":
                order_id = transaction.get("order_id")
                
                # Update transaction
                await transactions_collection.update_one(
                    {"session_id": session_id},
                    {"$set": {
                        "status": "paid",
                        "payment_status": "paid",
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
                
                # Update order
                await orders_collection.update_one(
                    {"id": order_id},
                    {"$set": {
                        "status": "confirmed",
                        "payment_status": "paid",
                        "updated_at": datetime.now(timezone.utc).isoformat()
                    }}
                )
                
                logger.info(f"Order {order_id} payment confirmed via webhook")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
