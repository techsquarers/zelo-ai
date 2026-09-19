from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime


class ProfileBase(BaseModel):
    year: Optional[int] = Field(None, ge=1, le=5)
    branch: Optional[str] = None
    target_roles: Optional[List[str]] = None
    daily_hours: Optional[float] = Field(None, ge=0.5, le=16)
    skill_levels: Optional[Dict[str, int]] = None   # e.g. {"dsa": 2, "system_design": 1}
    weak_areas: Optional[List[str]] = None
    preferred_style: Optional[str] = None           # video / reading / projects


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True