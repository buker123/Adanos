from fastapi import APIRouter, HTTPException
from typing import List
from models.menu_item import MenuItem, MenuItemCreate, MenuItemUpdate
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

router = APIRouter(prefix="/api/menu", tags=["menu"])

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
menu_collection = db.menu_items

CATEGORIES = [
    'beef-burgers',
    'chicken-burgers',
    'chicken-wings',
    'grilled-chicken',
    'lamb-chops',
    'light-meals',
    'sides',
    'salads',
    'kids-meals',
    'milkshakes',
    'smoothies',
    'waffles',
    'churros',
    'cookie-dough',
    'drinks',
    'sauces'
]

@router.get("/categories")
async def get_categories():
    return {"categories": CATEGORIES}

@router.get("/items", response_model=List[MenuItem])
async def get_all_items():
    items = await menu_collection.find().to_list(1000)
    return [MenuItem(**item) for item in items]

@router.get("/items/category/{category}", response_model=List[MenuItem])
async def get_items_by_category(category: str):
    items = await menu_collection.find({"category": category}).to_list(1000)
    return [MenuItem(**item) for item in items]

@router.get("/items/{item_id}", response_model=MenuItem)
async def get_item(item_id: str):
    item = await menu_collection.find_one({"id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return MenuItem(**item)

@router.post("/items", response_model=MenuItem)
async def create_item(item: MenuItemCreate):
    new_item = MenuItem(**item.dict())
    await menu_collection.insert_one(new_item.dict())
    return new_item

@router.put("/items/{item_id}", response_model=MenuItem)
async def update_item(item_id: str, item_update: MenuItemUpdate):
    existing_item = await menu_collection.find_one({"id": item_id})
    if not existing_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = {k: v for k, v in item_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await menu_collection.update_one({"id": item_id}, {"$set": update_data})
    
    updated_item = await menu_collection.find_one({"id": item_id})
    return MenuItem(**updated_item)

@router.delete("/items/{item_id}")
async def delete_item(item_id: str):
    result = await menu_collection.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}
