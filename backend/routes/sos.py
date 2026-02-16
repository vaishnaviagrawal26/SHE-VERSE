# backend/routes/sos.py
from fastapi import APIRouter, WebSocket, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter(prefix="/sos")
db = next(database.get_db())

# Simple SOS trigger endpoint
@router.post("/trigger")
def trigger_sos(sos: schemas.SOSCreate, current_user: models.User = Depends(utils.get_current_user)):
    # Save SOS alert
    new_alert = models.SOSAlert(
        message=sos.message,
        user_id=current_user.id
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    # Here you can integrate WebSocket / notifications to trusted contacts
    return {"message": "SOS triggered successfully"}

# Real-time WebSocket for SOS alerts
@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Here, broadcast or send to trusted contacts
            await websocket.send_text(f"Alert for user {user_id}: {data}")
    except Exception:
        await websocket.close()