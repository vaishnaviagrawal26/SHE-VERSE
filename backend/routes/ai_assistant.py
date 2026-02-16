# backend/routes/ai_assistant.py
from fastapi import APIRouter, Depends
from backend import models, schemas, utils
import random

router = APIRouter(prefix="/ai")
responses = {
    "I feel unsafe": "Try to move to a well-lit, populated area and alert your trusted contacts immediately.",
    "domestic violence": "Document the evidence, reach out to local NGOs, and contact verified lawyers via the app.",
    "cab incident": "Share your live location with trusted contacts and contact local authorities.",
    "cyber harassment": "Do not respond. Save screenshots and report to the authorities."
}

@router.post("/chat")
def chat_ai(query: str, current_user: models.User = Depends(utils.get_current_user)):
    answer = responses.get(query.lower(), "Stay calm. Move to a safe area and alert your trusted contacts.")
    confidence = random.randint(70, 99)
    return {"answer": answer, "confidence": confidence}