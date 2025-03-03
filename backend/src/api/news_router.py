from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List

from ..services.news_service import get_news_articles
from ..models.news import ArticleResponse

router = APIRouter(tags=["news"])

@router.get("/news", response_model=ArticleResponse)
async def get_news(
    category: Optional[str] = Query(None, description="News category"),
    q: Optional[str] = Query(None, description="Search query"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Number of articles per page")
):
    """
    Get news articles with optional filtering by category and search query.
    """
    try:
        result = await get_news_articles(category, q, page, page_size)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch news: {str(e)}")

@router.get("/categories")
async def get_categories():
    """
    Get available news categories.
    """
    categories = [
        "business", "entertainment", "general", "health", 
        "science", "sports", "technology"
    ]
    return {"categories": categories} 