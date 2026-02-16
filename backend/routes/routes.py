# backend/routes/routes.py
from fastapi import APIRouter, Depends
from backend import models, utils, database, schemas
from sqlalchemy.orm import Session

router = APIRouter(prefix="/routes")
db = next(database.get_db())

# Example endpoint: get safer routes
@router.get("/safer")
def get_safer_routes(current_user: models.User = Depends(utils.get_current_user)):
    # For demo, static routes with explanation
    routes = [
        {
            "type": "fastest",
            "distance_km": 5.2,
            "time_min": 12,
            "explanation": "Shortest distance, moderate crowd"
        },
        {
            "type": "safest",
            "distance_km": 5.8,
            "time_min": 15,
            "explanation": "Well-lit streets, CCTV cameras, low incident reports"
        },
        {
            "type": "safest_public",
            "distance_km": 6.0,
            "time_min": 17,
            "explanation": "Includes malls and public stations for safety"
        }
    ]
    return {"routes": routes}