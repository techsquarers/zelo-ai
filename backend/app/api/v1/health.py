from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text 
from app.core.database import get_db

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("Select 1"))
        db_status = "healthy"
    except:
        db_status = "unhealthy"
    
    return{
        "status" : "ok" if db_status == "healthy" else "degraded",
        "database" : db_status,
        "version" : "0.1.0"
    }

