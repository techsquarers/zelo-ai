from sqlalchemy import String, ForeignKey, Integer, DateTime, func, Date
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base
import uuid


class Streak(Base):
    __tablename__ = "streaks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)

    current_streak: Mapped[int] = mapped_column(Integer, default=0)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0)
    last_active_date: Mapped[Date | None] = mapped_column(Date, nullable=True)
    freezes_remaining: Mapped[int] = mapped_column(Integer, default=1)

    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class UserXP(Base):
    __tablename__ = "user_xp"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)

    total_xp: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)

    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())



    """This Python code defines two gamification database models (Streak and UserXP) using SQLAlchemy. They track user consistency and progression—similar to systems found in apps like Duolingo or GitHub.
------------------------------
## 🔥 1. The Streak Model
This model tracks daily consecutive activity to keep users motivated and engaged.

* user_id: Links directly to a user. Notice unique=True—this enforces a strict rule that a user can only have one streak record in the database.
* current_streak: An integer tracking how many days in a row the user has been active (starts at 0).
* longest_streak: Tracks the user's all-time record (all-time high streak) so they can look back at their best consistency milestone.
* last_active_date: Stored as a pure Date column (e.g., 2026-09-08). Your backend code will use this date to check if the user is maintaining their streak today, or if they missed a day and their streak should reset to zero.
* freezes_remaining: Acts as a safety net (defaults to 1). If a user misses a day, the backend logic can consume a "streak freeze" to save their progress instead of resetting them to zero.

------------------------------
## 🌟 2. The UserXP Model
This model handles the experience points (XP) and leveling system for user progression.

* user_id: Links to the user (also marked as unique=True so each user gets exactly one profile progression tracker).
* total_xp: Keeps a running tally of all experience points earned by finishing daily tasks (starts at 0).
* level: The user's overall tier or stage (starts at 1). When total_xp passes specific milestone thresholds (e.g., every 100 XP), your backend service will trigger a "level up".

------------------------------
## ⏱️ Common Fields
Both tables use an updated_at column tracking a timezone-aware DateTime. The parameter onupdate=func.now() ensures that the database automatically refreshes this timestamp whenever a row is modified (e.g., when a user levels up or updates their daily streak), removing the need to update it manually in your endpoints.
------------------------------
Would you like to build the service logic function that updates these tables whenever a task is marked as complete, including the math for calculation of XP additions, leveling up, and maintaining streaks?

"""