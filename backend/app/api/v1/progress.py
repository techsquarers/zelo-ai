from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from app.core.database import get_db
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.models.profile import Profile
from app.models.roadmap import Roadmap
from app.models.task import Task, TaskStatus, DailyPlan
from app.schemas.gamification import ProgressSummaryResponse, TodayProgress
from app.services.gamification_service import get_or_create_streak, get_or_create_xp

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.get("/summary", response_model=ProgressSummaryResponse)
async def get_progress_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    today = date.today().isoformat()

    # Streak & XP
    streak = await get_or_create_streak(db, current_user.id)
    xp = await get_or_create_xp(db, current_user.id)

    # Profile check
    result = await db.execute(select(Profile).where(Profile.user_id == current_user.id))
    has_profile = result.scalar_one_or_none() is not None

    # Roadmap check
    result = await db.execute(
        select(Roadmap).where(Roadmap.user_id == current_user.id, Roadmap.is_active == True)
    )
    has_roadmap = result.scalar_one_or_none() is not None

    # Today's tasks progress
    result = await db.execute(
        select(DailyPlan).where(
            DailyPlan.user_id == current_user.id,
            DailyPlan.date == today
        )
    )
    plan = result.scalar_one_or_none()

    if plan:
        result = await db.execute(
            select(Task).where(Task.daily_plan_id == plan.id)
        )
        tasks = result.scalars().all()
        total = len(tasks)
        completed = len([t for t in tasks if t.status == TaskStatus.done])
        pending = total - completed
        percentage = round((completed / total) * 100, 1) if total > 0 else 0.0
    else:
        total = completed = pending = 0
        percentage = 0.0

    await db.commit()

    return {
        "streak": streak,
        "xp": xp,
        "today": {
            "total_tasks": total,
            "completed_tasks": completed,
            "pending_tasks": pending,
            "completion_percentage": percentage
        },
        "has_roadmap": has_roadmap,
        "has_profile": has_profile
    }




    """This code defines a FastAPI router (/progress) with a comprehensive metadata endpoint called GET /progress/summary.
It acts as an orchestration API that aggregates data from five different database sources (Streak, UserXP, Profile, Roadmap, and DailyPlan/Task). The front-end mobile app or web client can call this single endpoint to instantly know exactly what state the user's account is in, making it perfect for custom user dashboards, analytics widgets, or onboarding state-machines.
Here is a step-by-step breakdown of how it dynamically builds this high-level progress report:
------------------------------
## 🎮 Step 1: Gather Gamification Baseline Stats

* It queries the streak tracking and level progression systems using your established get_or_create_* fallback service layer pattern.
* This seamlessly handles new users by initializing their tracking rows behind the scenes if they don't have them yet.

## 👤 Step 2: Evaluate App Onboarding & Content States
It runs two quick validation checks to establish the structural state of the user's account:

* has_profile: Evaluates whether the user has successfully finished the primary onboarding profile setup.
* has_roadmap: Evaluates whether the user has run the rule engine to build an active learning path blueprint.
* Why this is useful: The frontend can use these boolean flags (True/False) to automatically lock/unlock features or conditionally redirect a user to a configuration wizard.

## 📊 Step 3: Run Today's Productivity Metrics Math
It queries today's specific date stamp entry in the DailyPlan container to measure real-time daily progress:

* Scenario A: The user has logged into their workspace today (if plan:)
* It pulls down the array of all sub-tasks mapped to that specific day.
   * It calculates structural completion metrics:
   * total: Counts total assigned targets using standard python list sizing.
      * completed: Uses a list comprehension filtering explicitly for rows matching TaskStatus.done.
      * pending: Subtracts completed benchmarks from total rows.
      * percentage: Calculates execution efficiency (completed / total * 100) and uses Python's round(..., 1) to keep the number clean (e.g., 66.7%).
   * Scenario B: First visit of the day (else:)
* If no daily schedule has been initialized yet, it safely soft-initializes all metric variables to 0 or 0.0 to prevent mathematical division-by-zero crashes.

------------------------------
## 📦 Step 4: Structuring the Combined JSON Output
After running a db.commit() to write any lazy-loaded initialization records to disk, it aggregates all the processed metrics into a single dictionary tree mapping out a ProgressSummaryResponse payload structure.
## What the Final JSON Payload Looks Like:

{
  "streak": {
    "current_streak": 3,
    "longest_streak": 10,
    "last_active_date": "2026-09-08",
    "freezes_remaining": 1
  },
  "xp": {
    "total_xp": 250,
    "level": 3
  },
  "today": {
    "total_tasks": 4,
    "completed_tasks": 2,
    "pending_tasks": 2,
    "completion_percentage": 50.0
  },
  "has_roadmap": true,
  "has_profile": true
}

------------------------------
Now that you have your core analytics overview set up, do you want to see how to write a complementary router endpoint to fetch historical weekly progress records (e.g., a 7-day completion chart tracking), or would you like to review how to wire up your unit tests?

"""