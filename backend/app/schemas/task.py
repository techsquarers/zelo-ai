from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.task import TaskStatus


class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    resource_url: Optional[str]
    estimated_minutes: int
    xp_value: int
    status: TaskStatus
    order: int
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class DailyTasksResponse(BaseModel):
    date: str
    tasks: List[TaskResponse]


class CompleteTaskRequest(BaseModel):
    status: TaskStatus = TaskStatus.done




"""This code defines the Pydantic schemas (data exchange schemas) used to handle the input and output JSON data for your Daily Planner API.
They act as a contract between your frontend and backend, validating data structures and automatically converting your SQLAlchemy models into JSON responses.
------------------------------
## 📤 1. TaskResponse (Individual Task Data Out)
This defines how a single learning task looks when the backend sends it to the frontend.

* Null-Safe Fields: Fields like description, resource_url, and completed_at use Optional[...] (or None), meaning the API can safely return null if a task doesn't have an article link or hasn't been finished yet.
* Enum integration: It imports TaskStatus straight from your database model file. This ensures the output string will strictly match one of your four valid states (pending, done, partial, or skipped).
* from_attributes = True: Just like with your roadmaps, this allows FastAPI to accept a raw SQLAlchemy Task object from your database query and automatically serialize it into this exact JSON format.

------------------------------
## 📦 2. DailyTasksResponse (Nested Day-Log Output)
This handles a user's full view for a single day. Instead of sending a separate list of tasks, it structures everything cleanly into a parent-child relationship.

* date: Returns the target day (e.g., "2026-09-08").
* tasks: List[TaskResponse]: This nests the individual TaskResponse models inside a list. When called, the frontend receives a clean block containing the date and an array of all organized tasks belonging to that specific day.

------------------------------
## 📥 3. CompleteTaskRequest (Updating Task Status In)
This schema handles data coming from the frontend when a user interacts with a task on their dashboard.

* status: TaskStatus = TaskStatus.done: When updating a task, the frontend sends a payload like {"status": "done"} or {"status": "skipped"}.
* By setting the default to TaskStatus.done, if the frontend simply pings the endpoint with an empty body {} to say "I completed this", the backend automatically assumes the task status should be updated to done.

------------------------------
Would you like to build the FastAPI router endpoints that utilize these schemas to fetch a user's daily tasks or check off a completed task?

"""