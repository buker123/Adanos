from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime, timezone
import uuid

class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    image: Optional[str] = None

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    items: List[OrderItem]
    subtotal: float
    total: float
    status: str = "pending"  # pending, paid, preparing, ready, completed, cancelled
    payment_status: str = "initiated"  # initiated, paid, failed, refunded
    stripe_session_id: Optional[str] = None
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    delivery_address: Optional[str] = None
    order_type: str = "collection"  # collection or delivery
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CreateCheckoutRequest(BaseModel):
    items: List[OrderItem]
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    order_type: str = "collection"
    delivery_address: Optional[str] = None
    notes: Optional[str] = None
    origin_url: str

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    session_id: str
    amount: float
    currency: str = "gbp"
    status: str = "initiated"  # initiated, paid, failed, expired
    payment_status: str = "pending"
    metadata: Optional[Dict[str, str]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
