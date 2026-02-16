# backend/routes/trusted_contacts.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter(prefix="/trusted_contacts")
db = next(database.get_db())

# Add a trusted contact
@router.post("/", response_model=schemas.TrustedContactOut)
def add_contact(contact: schemas.TrustedContactCreate, current_user: models.User = Depends(utils.get_current_user)):
    new_contact = models.TrustedContact(
        name=contact.name,
        phone=contact.phone,
        layer=contact.layer,
        owner_id=current_user.id
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

# List all trusted contacts
@router.get("/", response_model=list[schemas.TrustedContactOut])
def list_contacts(current_user: models.User = Depends(utils.get_current_user)):
    return db.query(models.TrustedContact).filter(models.TrustedContact.owner_id == current_user.id).all()

# Delete contact
@router.delete("/{contact_id}")
def delete_contact(contact_id: int, current_user: models.User = Depends(utils.get_current_user)):
    contact = db.query(models.TrustedContact).filter(
        models.TrustedContact.id == contact_id,
        models.TrustedContact.owner_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(contact)
    db.commit()
    return {"message": "Contact deleted successfully"}