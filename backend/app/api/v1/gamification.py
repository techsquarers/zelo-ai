from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.schemas.gamification import StreakResponse, XPResponse, DashboardResponse
from app.services.gamification_service import get_or_create_streak, get_or_create_xp

router = APIRouter(prefix="/gamification", tags=["Gamification"])


@router.get("/streak", response_model=StreakResponse)
async def get_streak(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    streak = await get_or_create_streak(db, current_user.id)
    await db.commit()
    return streak


@router.get("/xp", response_model=XPResponse)
async def get_xp(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    xp = await get_or_create_xp(db, current_user.id)
    await db.commit()
    return xp


@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    streak = await get_or_create_streak(db, current_user.id)
    xp = await get_or_create_xp(db, current_user.id)
    await db.commit()
    return {
        "streak": streak,
        "xp": xp
    }



    """This code defines a FastAPI router (/gamification) containing three asynchronous endpoints. It serves as the delivery layer that exposes a user's streak metrics, XP values, and overall gamification stats to your frontend application.
It handles everything safely by utilizing the "get-or-create" pattern we reviewed in the service layer, ensuring that even a brand-new user with zero records will receive an initialized response instead of a system crash.
------------------------------
## 📥 1. GET /gamification/streak (Fetch Consistency Tracker)

* Purpose: Fetches the current user's daily habits data (current streak count, record streak, freezes left).
* How it works: It calls the service function get_or_create_streak. If it's the user's first time checking their streak, the service initializes a row for them behind the scenes.
* await db.commit(): Since get_or_create might have written a new record to the database, a commit is run to finalize that row creation transaction before returning the data.
* Output: Formatted cleanly using the StreakResponse Pydantic model.

------------------------------
## 📤 2. GET /gamification/xp (Fetch Tier & Points Progress)

* Purpose: Fetches the user's total experience points and overall calculated level.
* How it works: Similar to the streak endpoint, it leverages get_or_create_xp to safely query the user_xp table. If a user row doesn't exist yet, it instantiates it seamlessly.
* Output: Parsed into a clean JSON layout structured strictly around the XPResponse schema guidelines.

------------------------------
## 📊 3. GET /gamification/dashboard (The Composite Aggregator)

* Purpose: This is the most optimal endpoint for building a user landing screen dashboard. Instead of making two separate network requests from your frontend (/streak and then /xp), the frontend can pull all profile metrics in one single round-trip.
* How it works:
1. It runs both service functions sequentially to extract the user's specific records.
   2. It executes a database commit to guarantee any auto-generated initialization lines are written to disk.
   3. It packages the raw database rows directly into a dictionary mapping:
   
   return {
       "streak": streak,
       "xp": xp
   }
   
   * Output: The nesting aligns perfectly with your composite DashboardResponse schema model, generating a unified JSON tree containing both components.

------------------------------
Now that you have all your baseline microservices and routes mapped out, would you like to see how to integrate the process_task_completion function straight into your task completion router (POST /tasks/{task_id}/complete) so that checking off a task triggers these systems automatically?

"""

