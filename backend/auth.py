from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=dict, status_code=status.HTTP_201_CREATED)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email.lower()).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed_password = utils.hash_password(user.password)

    new_user = models.User(
        full_name=user.full_name,
        email=user.email.lower(),
        phone=user.phone,
        password=hashed_password,
        role="user",
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # ⭐ create token same like login
    token = utils.create_access_token({"sub": new_user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "phone": new_user.phone,
            "role": new_user.role,
        },
    }


@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email.lower()).first()

    if not db_user or not utils.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = utils.create_access_token({"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "phone": db_user.phone,
            "role": db_user.role,
        },
    }


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(utils.get_current_user)):
    return current_user
