from sqlalchemy import String, ForeignKey, Integer, DateTime, func, Text, Float, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
import uuid
import enum


class TaskStatus(str, enum.Enum):
    pending = "pending"
    done = "done"
    partial = "partial"
    skipped = "skipped"


class DailyPlan(Base):
    __tablename__ = "daily_plans"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    date: Mapped[str] = mapped_column(String(10), index=True)  # YYYY-MM-DD
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    tasks = relationship("Task", back_populates="daily_plan", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    daily_plan_id: Mapped[str] = mapped_column(String(36), ForeignKey("daily_plans.id", ondelete="CASCADE"))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    resource_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    estimated_minutes: Mapped[int] = mapped_column(Integer, default=30)
    xp_value: Mapped[int] = mapped_column(Integer, default=10)
    status: Mapped[TaskStatus] = mapped_column(SAEnum(TaskStatus), default=TaskStatus.pending)
    order: Mapped[int] = mapped_column(Integer, default=0)

    completed_at: Mapped[DateTime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    daily_plan = relationship("DailyPlan", back_populates="tasks")







"""This Python code defines an Enforced Daily Planner System using SQLAlchemy. It tracks what a user needs to study or build on any given day, complete with individual gamified tasks, completion states, and an automated database relationship.
It breaks down into three key elements:
------------------------------
## ⏱️ 1. The State Enum: TaskStatus
This is a standard Python enumeration (Enum) that forces tasks to have only one of four specific values. This prevents typos in status updates:

* pending: Default state when a task is created.
* done: Completed successfully.
* partial: Partially finished.
* skipped: Dismissed by the user.

------------------------------
## 📅 2. The Main Wrapper: DailyPlan
This represents a single container model mapped to the daily_plans table. Think of it as a user's day log.

* id: Generates a random 36-character unique string (UUID v4) for each daily entry.
* user_id: Links the daily log back to a user. If the user profile is deleted, this plan is dropped too (ondelete="CASCADE").
* date: Stored as a plain string in YYYY-MM-DD format (indexed for lightning-fast queries).
* tasks relationship: This maps the plan to individual actions. The parameter cascade="all, delete-orphan" ensures that if you delete a DailyPlan, all individual sub-tasks mapped to that specific day are wiped from the database automatically.

------------------------------
## 📝 3. The Individual Action: Task
This maps to the tasks table and represents an individual piece of learning inside a daily plan (e.g., "Solve 2 Array Problems" or "Read a System Design Article").

* Identifiers: It links explicitly to both a daily_plan_id and a user_id.
* Content: Contains a title, an optional longer description, and a resource_url field to point the user to a learning link (like LeetCode, GitHub, or an article).
* Gamification & Timing:
* estimated_minutes: Gives the user a target timeline (defaults to 30 mins).
   * xp_value: Gamifies learning by assigning a point reward value (defaults to 10 XP) when finished.
* status & order: Tracks task completion using the TaskStatus enum. The order column ensures you can rearrange tasks sequentially (Task 1, Task 2, Task 3).
* Timestamps: Tracks when the task was generated (created_at) and logs the exact moment it was completed (completed_at).

------------------------------
## 🔗 How They Connect in Python
Because of the matching relationship() declarations on both tables, your backend code can do things like this:

# To fetch all tasks for a day
print(my_daily_plan.tasks) 
# To see what day container a task belongs to
print(my_task.daily_plan.date)

Would you like to build a FastAPI Pydantic schema to manage these tasks, or do you want to see the service logic for marking a task as done and awarding XP?
"""