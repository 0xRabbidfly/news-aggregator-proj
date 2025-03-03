import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager

from src.api.news_router import router as news_router

# Load environment variables
load_dotenv()

# Define lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Validate environment variables
    if not os.getenv("NEWS_API_KEY"):
        print("WARNING: NEWS_API_KEY environment variable not set. API calls may fail.")
    
    yield
    
    # Shutdown: Clean up resources if needed
    pass

# Create FastAPI app with lifespan
app = FastAPI(
    title="News Aggregator API",
    description="API for fetching and analyzing news articles",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(news_router, prefix="/api")

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
