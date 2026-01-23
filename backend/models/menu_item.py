from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class MenuItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    image: str
    category: str
    rating: Optional[str] = None
    popular: bool = False
    spicy: bool = False
    available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    image: str
    category: str
    rating: Optional[str] = None
    popular: bool = False
    spicy: bool = False
    available: bool = True

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    category: Optional[str] = None
    rating: Optional[str] = None
    popular: Optional[bool] = None
    spicy: Optional[bool] = None
    available: Optional[bool] = None

class AdminLogin(BaseModel):
    username: str
    password: str
