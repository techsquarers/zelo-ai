from pydantic import BaseModel
from typing import Optional
from datetime import date
from app.schemas.task import TaskResponse

class StreakResponse(BaseModel):
    current_streak: int
    longest_streak: int
    last_active_date: Optional[date]
    freezes_remaining: int

    class Config:
        from_attributes = True


class XPResponse(BaseModel):
    total_xp: int
    level: int

    class Config:
        from_attributes = True

class TodayProgress(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completion_percentage: float


class DashboardResponse(BaseModel):
    streak: StreakResponse
    xp: XPResponse



class ProgressSummaryResponse(BaseModel):
    streak: StreakResponse
    xp: XPResponse
    today: TodayProgress
    has_roadmap: bool
    has_profile: bool



"""This code defines three Pydantic schemas that structure and format gamification metrics for your frontend API.
The main highlight here is DashboardResponse, which wraps your separate streak and XP data profiles into one combined structure. This allows your frontend to fetch a user's entire profile status (level, XP, and streak count) with a single API call.
------------------------------
## 🔥 1. StreakResponse (Consistency Stats Data Out)
This handles the outbound JSON structure for a user's daily habits.

* last_active_date: Optional[date]: Since a brand-new user has no history, this field is allowed to return null without crashing your API. Pydantic automatically serializes Python date objects into a clean, standard date string format (YYYY-MM-DD).
* from_attributes = True: Allows your FastAPI routes to accept a raw SQLAlchemy Streak object and instantly convert it to this JSON schema format.

## 🌟 2. XPResponse (Leveling Stats Data Out)
This handles the outbound JSON structure for a user's experience details.

* It exposes only the necessary stats (total_xp and level) while completely hiding database mechanics like internal database IDs or row timestamps (updated_at), keeping your payload lightweight.
* It also contains from_attributes = True to easily parse SQLAlchemy UserXP data models.

## 📊 3. DashboardResponse (The Unified Wrapper)
This serves as a parent schema designed for an overall user dashboard endpoint. Instead of flat key-value pairs, it maps nested child objects:

* streak: Holds an entire embedded StreakResponse object.
* xp: Holds an entire embedded XPResponse object.

## What the Final JSON Output Looks Like:
When your API endpoints return a DashboardResponse model, the frontend receives a structured payload like this:

{
  "streak": {
    "current_streak": 5,
    "longest_streak": 12,
    "last_active_date": "2026-09-08",
    "freezes_remaining": 1
  },
  "xp": {
    "total_xp": 450,
    "level": 4
  }
}

------------------------------
Would you like to build the FastAPI router endpoint (GET /dashboard/stats) that fetches these two database rows simultaneously and returns them using this exact structural template?

"""