# backend/routes/legal.py
from fastapi import APIRouter, Depends
from backend import models, schemas, utils, database
from sqlalchemy.orm import Session

router = APIRouter(prefix="/legal")
db = next(database.get_db())

# Helpline / NGO info
@router.get("/helplines")
def get_helplines():
    helplines = [
        {"name": "National Women's Helpline", "number": "1091"},
        {"name": "Police", "number": "100"},
        {"name": "Local NGO - SafeHome", "number": "1234567890"}
    ]
    return {"helplines": helplines}

# Evidence upload placeholder
@router.post("/upload")
def upload_evidence(description: str, current_user: models.User = Depends(utils.get_current_user)):
    # For demo: just acknowledge
    return {"message": f"Evidence '{description}' saved successfully. (Placeholder)"}