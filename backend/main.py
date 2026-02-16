# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from backend import auth
from backend.routes import trusted_contacts, forum, sos, routes, ai_assistant, legal
from backend import database, models

# Create app
app = FastAPI(title="SheVerse Women Safety System")

# CORS settings (frontend running on localhost:3000 etc)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB
models.Base.metadata.create_all(bind=database.engine)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(trusted_contacts.router, prefix="/trusted_contacts", tags=["Trusted Contacts"])
app.include_router(forum.router, prefix="/forum", tags=["Community Forum"])
app.include_router(sos.router, prefix="/sos", tags=["SOS"])
app.include_router(routes.router, prefix="/routes", tags=["Smart Routes"])
app.include_router(ai_assistant.router, prefix="/ai", tags=["Sakhi AI"])
app.include_router(legal.router, prefix="/legal", tags=["Legal & Evidence Support"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "SheVerse Women Safety System Backend is Running ✅"}