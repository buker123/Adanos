from fastapi import APIRouter, HTTPException, Depends, Header
from typing import List, Optional
from models.menu_item import MenuItem, MenuItemCreate, MenuItemUpdate
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path
import jwt

router = APIRouter(prefix="/api/menu", tags=["menu"])

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# JWT secret - same as admin.py
SECRET_KEY = os.environ.get('JWT_SECRET', 'adanos-secret-key-2026')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
menu_collection = db.menu_items

CATEGORIES = [
    'beef-burgers',
    'chicken-burgers',
    'box-meals',
    'light-meals',
    'loaded-chips',
    'adanos-grilled',
    'sides',
    'kids-meals',
    'milkshakes',
    'smoothies',
    'ice-cream',
    'waffles',
    'desserts',
    'drinks',
    'sauces'
]

async def verify_admin_token(authorization: Optional[str] = Header(None)):
    """Verify JWT token from Authorization header"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header required")
    
    try:
        # Handle "Bearer <token>" format
        if authorization.startswith("Bearer "):
            token = authorization[7:]
        else:
            token = authorization
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/categories")
async def get_categories():
    return {"categories": CATEGORIES}

@router.get("/items", response_model=List[MenuItem])
async def get_all_items():
    items = await menu_collection.find({}, {"_id": 0}).to_list(1000)
    return [MenuItem(**item) for item in items]

@router.get("/items/category/{category}", response_model=List[MenuItem])
async def get_items_by_category(category: str):
    items = await menu_collection.find({"category": category}, {"_id": 0}).to_list(1000)
    return [MenuItem(**item) for item in items]

@router.get("/items/{item_id}", response_model=MenuItem)
async def get_item(item_id: str):
    item = await menu_collection.find_one({"id": item_id}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return MenuItem(**item)

@router.post("/items", response_model=MenuItem)
async def create_item(item: MenuItemCreate, _: dict = Depends(verify_admin_token)):
    new_item = MenuItem(**item.dict())
    await menu_collection.insert_one(new_item.dict())
    return new_item

@router.put("/items/{item_id}", response_model=MenuItem)
async def update_item(item_id: str, item_update: MenuItemUpdate, _: dict = Depends(verify_admin_token)):
    existing_item = await menu_collection.find_one({"id": item_id})
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = {k: v for k, v in item_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)
    
    await menu_collection.update_one({"id": item_id}, {"$set": update_data})
    
    updated_item = await menu_collection.find_one({"id": item_id}, {"_id": 0})
    return MenuItem(**updated_item)

@router.delete("/items/{item_id}")
async def delete_item(item_id: str, _: dict = Depends(verify_admin_token)):
    result = await menu_collection.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}
