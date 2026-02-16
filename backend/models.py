# backend/models.py
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.database import Base

# User model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="user")

    contacts = relationship("TrustedContact", back_populates="owner")
    sos_alerts = relationship("SOSAlert", back_populates="user")
    forum_posts = relationship("ForumPost", back_populates="author")


# Trusted contacts
class TrustedContact(Base):
    __tablename__ = "trusted_contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    layer = Column(Integer, default=1)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="contacts")


# SOS alerts
class SOSAlert(Base):
    __tablename__ = "sos_alerts"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="sos_alerts")


# Forum posts
class ForumPost(Base):
    __tablename__ = "forum_posts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="forum_posts")


# Smart routes
class SmartRoute(Base):
    __tablename__ = "smart_routes"

    id = Column(Integer, primary_key=True, index=True)
    start_point = Column(String, nullable=False)
    end_point = Column(String, nullable=False)
    route_type = Column(String, nullable=False)  # fastest / safest / public_safe
    explanation = Column(Text)  # why route is safe