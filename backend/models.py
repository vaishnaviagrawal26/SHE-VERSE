# backend/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from backend.database import Base


# ======================
# User model
# ======================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)

    password = Column(String(255), nullable=False)
    role = Column(String(20), default="user", nullable=False)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    contacts = relationship(
        "TrustedContact",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    sos_alerts = relationship(
        "SOSAlert",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    forum_posts = relationship(
        "ForumPost",
        back_populates="author",
        cascade="all, delete-orphan"
    )


# ======================
# Trusted contacts
# ======================

class TrustedContact(Base):
    __tablename__ = "trusted_contacts"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    layer = Column(Integer, default=1, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)

    owner = relationship("User", back_populates="contacts")


# ======================
# SOS alerts
# ======================

class SOSAlert(Base):
    __tablename__ = "sos_alerts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="sos_alerts")


# ======================
# Forum posts
# ======================

class ForumPost(Base):
    __tablename__ = "forum_posts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    author = relationship("User", back_populates="forum_posts")


# ======================
# Smart routes
# ======================

class SmartRoute(Base):
    __tablename__ = "smart_routes"

    id = Column(Integer, primary_key=True, index=True)

    start_point = Column(String(255), nullable=False)
    end_point = Column(String(255), nullable=False)

    route_type = Column(String(50), nullable=False)  # fastest / safest / public_safe
    explanation = Column(Text)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
