from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo= settings.DEBUG,
    pool_pre_ping=True,
    pool_size= 10,
    max_overflow= 20,
    connect_args={"prepared_statement_cache_size": 0}
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

class Base(DeclarativeBase):
    pass 

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

# Here is the step-by-step breakdown of how it works:try: starts a block of code where Python watches for any errors or crashes.yield session pauses the function and gives an active database session (the connection used to talk to the database) to your main code so it can run queries.await session.commit() saves all your changes permanently to the database if your main code finishes without any errors.except Exception: catches the program if an error or crash happens while your code is running.await session.rollback() undoes any temporary changes made during the failed action so the database stays clean and safe.raise passes the caught error back up to the main program so it knows a failure occurred.finally: starts a cleanup section that always runs, whether your code succeeded or failed.await session.close() shuts down the database connection so it does not waste computer memory or server resources.