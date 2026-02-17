from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter(tags=["SOS"])


# ----------------------------
# Trigger SOS
# ----------------------------
@router.post("/trigger")
def trigger_sos(
    sos: schemas.SOSCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(utils.get_current_user),
):
    new_alert = models.SOSAlert(
        message=sos.message,
        user_id=current_user.id,
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {"sos_id": new_alert.id}


# ----------------------------
# Update live location
# ----------------------------
@router.post("/{sos_id}/location")
def update_location(
    sos_id: int,
    location: dict,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(utils.get_current_user),
):
    alert = db.query(models.SOSAlert).filter(models.SOSAlert.id == sos_id).first()
    if not alert:
        return {"error": "SOS not found"}

    # (Future: save location history)
    return {"message": "Location updated"}


# ----------------------------
# Upload audio evidence
# ----------------------------
@router.post("/{sos_id}/upload-audio")
def upload_audio(
    sos_id: int,
    audio: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(utils.get_current_user),
):
    # (Future: save file to storage)
    return {"message": "Audio uploaded"}


# ----------------------------
# User stats
# ----------------------------
@router.get("/stats")
def get_stats(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(utils.get_current_user),
):
    total_sos = (
        db.query(models.SOSAlert)
        .filter(models.SOSAlert.user_id == current_user.id)
        .count()
    )

    return {
        "sosCount": total_sos,
        "alertsSent": total_sos,
        "safeRoutesUsed": 0,
    }
