from pydantic import BaseModel
from typing import Optional

# ----------------------
# User Schemas
# ----------------------
class UserCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    role: str

    model_config = {
        "from_attributes": True
    }


# ----------------------
# Trusted Contacts Schemas
# ----------------------
class TrustedContactCreate(BaseModel):
    name: str
    phone: str
    layer: Optional[int] = 1


class TrustedContactOut(BaseModel):
    id: int
    name: str
    phone: str
    layer: int

    model_config = {
        "from_attributes": True
    }


# ----------------------
# SOS / Forum Schemas
# ----------------------
class SOSCreate(BaseModel):
    message: str


class ForumPostCreate(BaseModel):
    content: str


class SOSCreate(BaseModel):
    message: str | None = "Emergency SOS triggered"
