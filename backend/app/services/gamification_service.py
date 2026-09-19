from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.gamification import Streak, UserXP
from app.models.task import Task, TaskStatus


def calculate_level(total_xp: int) -> int:
    # Simple level formula: every 100 XP = 1 level
    return max(1, (total_xp // 100) + 1)


async def get_or_create_streak(db: AsyncSession, user_id: str) -> Streak:
    result = await db.execute(select(Streak).where(Streak.user_id == user_id))
    streak = result.scalar_one_or_none()
    if not streak:
        streak = Streak(user_id=user_id)
        db.add(streak)
        await db.flush()
    return streak


async def get_or_create_xp(db: AsyncSession, user_id: str) -> UserXP:
    result = await db.execute(select(UserXP).where(UserXP.user_id == user_id))
    xp = result.scalar_one_or_none()
    if not xp:
        xp = UserXP(user_id=user_id)
        db.add(xp)
        await db.flush()
    return xp


async def process_task_completion(db: AsyncSession, user_id: str, xp_earned: int):
    """Call this when a task is marked done"""
    today = date.today()

    # --- XP ---
    user_xp = await get_or_create_xp(db, user_id)
    user_xp.total_xp += xp_earned
    user_xp.level = calculate_level(user_xp.total_xp)

    # --- Streak ---
    streak = await get_or_create_streak(db, user_id)

    if streak.last_active_date == today:
        # already counted today
        return

    if streak.last_active_date == today - timedelta(days=1):
        # continuing streak
        streak.current_streak += 1
    elif streak.last_active_date is None or streak.last_active_date < today - timedelta(days=1):
        # broken or first time
        if streak.freezes_remaining > 0 and streak.last_active_date == today - timedelta(days=2):
            # use freeze
            streak.freezes_remaining -= 1
            streak.current_streak += 1
        else:
            streak.current_streak = 1

    streak.longest_streak = max(streak.longest_streak, streak.current_streak)
    streak.last_active_date = today

    await db.commit()


    """This Python file is the gamification engine (service layer) of your application. It contains the business logic that handles updating a user's gamification stats (XP, Levels, and Streaks) whenever they complete a learning task.
Here is a breakdown of how its functions manage the progression system:
------------------------------
## 🧮 1. Progression Math: calculate_level

* A utility function that determines a user's current level based on their lifetime XP.
* It uses a linear formula: every 100 XP unlocks a new level (e.g., 0–99 XP is Level 1, 100–199 XP is Level 2).
* // 100 performs integer division (flooring), and max(1, ...) guarantees a user never drops below Level 1.

------------------------------
## 🛡️ 2. Safe Database Getters: get_or_create_*
Both get_or_create_streak and get_or_create_xp use a fallback pattern to prevent your app from crashing for new profiles:

   1. They search the database for an existing record linked to the user_id.
   2. If found, they return it.
   3. If not found, they instantiate a brand-new row initialization record (Streak or UserXP), append it via db.add(), and execute await db.flush() to generate its primary key ID right away.

------------------------------
## ⚡ 3. The Orchestrator: process_task_completion
This is the core function called by your API router when a task is turned in as done. It evaluates two systems independently:
## Part A: Handling Experience and Level Ups

   1. It retrieves the user's XP record.
   2. It increases total_xp by the exact point amount allocated to that specific task (e.g., +20 XP).
   3. It recalculates the user's tier immediately. If their raw points cross a century boundary, their level automatically jumps up.

## Part B: Handling Streak Tracking Logic
It updates daily consecutive habits by comparing today's date against the saved last_active_date:

* Scenario 1: Multiple tasks in one day (last_active_date == today)
* The user already logged activity earlier today. The function returns immediately without modifying the streak counters, preventing them from cheating the system.
* Scenario 2: The Streak Continues (last_active_date == yesterday)
* They logged an action yesterday and completed one today. current_streak increases by 1.
* Scenario 3: The Streak Freeze Safe-Haven (last_active_date == 2 days ago)
* The user completely missed yesterday, but they still have a protective item buffer (freezes_remaining > 0).
   * The engine consumes a freeze (freezes_remaining -= 1) and saves the streak, incrementing it by 1 as if they hadn't missed the day.
* Scenario 4: Streak Resets (First time or missed > 2 days)
* If they ran out of freezes or missed multiple consecutive days, their progress resets back down to a 1-day streak.

## Part C: Finalizing High Scores
Before writing to disk, it compares current_streak against longest_streak using max(), guaranteeing their all-time personal high score record updates instantly if broken. It flags last_active_date = today and commits the entire state transaction together cleanly.
------------------------------
Would you like to modify this service to implement an exponential leveling curve (where higher levels require progressively more XP, like Level * 120 XP), or do you need to hook this function directly into your task completion router?

"""