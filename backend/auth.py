# backend/auth.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter()
db = next(database.get_db())

# ----------------------
# Signup
# ----------------------
@router.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = utils.hash_password(user.password)
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password=hashed_password,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ----------------------
# Login
# ----------------------
@router.post("/login")
def login(user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = utils.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer", "user": {
        "id": db_user.id,
        "full_name": db_user.full_name,
        "email": db_user.email,
        "phone": db_user.phone,
        "role": db_user.role
    }}

# ----------------------
# Get current user
# ----------------------
@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(utils.get_current_user)):
    return current_user