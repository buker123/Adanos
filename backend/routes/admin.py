from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import os
from datetime import datetime, timedelta
import jwt

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Admin credentials (in production, use hashed passwords)
ADMIN_USERNAME = "adanos"
ADMIN_PASSWORD = "adanos2026"
SECRET_KEY = os.environ.get('JWT_SECRET', 'adanos-secret-key-2026')

class AdminLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=TokenResponse)
async def admin_login(credentials: AdminLogin):
    if credentials.username != ADMIN_USERNAME or credentials.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create JWT token
    token_data = {
        "sub": credentials.username,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    
    return {"access_token": token, "token_type": "bearer"}

@router.get("/verify")
async def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"valid": True, "username": payload.get("sub")}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
