# src/backend/api/image.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.backend.models.models import Image, DisplayRecord
from src.backend.deps.database import get_db

import random
import os

router = APIRouter()

@router.get("/random")
def get_random_image(db: Session = Depends(get_db)):
    """
    Get a random image from the database.
    """
    images = db.query(Image).all()
    if not images:
        return {"message": "No images found."}
    
    image = random.choice(images)

    return {
        "id": image.id,
        "name": image.filename,
        "path": os.path.join(os.getenv("IMAGE_DIR", ""), image.filepath)
    }


@router.post("/{image_id}/view")
def record_image_view(image_id: int, db: Session = Depends(get_db)):
    """Record that a user viewed an image."""
    image = db.query(Image).filter(Image.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    record = DisplayRecord(image_id=image.id)
    db.add(record)
    db.commit()
    return {"message": "view recorded"}


@router.get("/{image_id}/views")
def get_image_views(image_id: int, db: Session = Depends(get_db)):
    """Return how many times the image was viewed."""
    count = (
        db.query(func.count(DisplayRecord.id))
        .filter(DisplayRecord.image_id == image_id)
        .scalar()
    )
    return {"image_id": image_id, "views": count or 0}
