from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime


class RoadmapResponse(BaseModel):
    id: str
    title: str
    target_role: str
    phases: List[Dict[str, Any]]
    current_phase: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GenerateRoadmapRequest(BaseModel):
    target_role: Optional[str] = None   # if not given, use first from profile