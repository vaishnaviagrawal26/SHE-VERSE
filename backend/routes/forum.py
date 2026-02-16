# backend/routes/forum.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, database, utils

router = APIRouter(prefix="/forum")
db = next(database.get_db())

# Create a post
@router.post("/", response_model=schemas.ForumPostCreate)
def create_post(post: schemas.ForumPostCreate, current_user: models.User = Depends(utils.get_current_user)):
    new_post = models.ForumPost(
        content=post.content,
        author_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

# List posts
@router.get("/", response_model=list[schemas.ForumPostCreate])
def list_posts():
    return db.query(models.ForumPost).all()

# Reply / Comment placeholder (can extend later)