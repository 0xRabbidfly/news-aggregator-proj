from fastapi import APIRouter, HTTPException
from src.models.news import NewsResponse, Article, Sentiment
from src.services.sentiment import analyze_sentiment
import httpx
import os
from typing import Optional

router = APIRouter()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_BASE_URL = "https://newsapi.org/v2"

async def fetch_news(category: Optional[str] = None, q: Optional[str] = None) -> NewsResponse:
    if not NEWS_API_KEY:
        raise HTTPException(status_code=500, detail="News API key not configured")
    
    # Choose endpoint based on whether we're searching or getting top headlines
    endpoint = f"{NEWS_API_BASE_URL}/{'everything' if q else 'top-headlines'}"
    
    params = {
        "apiKey": NEWS_API_KEY,
        "language": "en",
    }
    
    if category and not q:  # Category only works with top-headlines
        params["category"] = category
    
    if q:
        params["q"] = q
    elif not category:  # If no search query and no category, default to top headlines
        params["country"] = "us"  # Default to US news for top headlines
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(endpoint, params=params)
            response.raise_for_status()
            data = response.json()
            
            articles = []
            for article in data["articles"]:
                # Analyze sentiment from title and description
                text_to_analyze = f"{article['title']} {article.get('description', '')}"
                sentiment_result = analyze_sentiment(text_to_analyze)
                
                articles.append(
                    Article(
                        title=article["title"],
                        description=article.get("description"),
                        url=article["url"],
                        urlToImage=article.get("urlToImage"),
                        publishedAt=article["publishedAt"],
                        source=article["source"]["name"] if article.get("source") else None,
                        author=article.get("author"),
                        sentiment=Sentiment(**sentiment_result),
                        category=category if category else "general"  # Include the category
                    )
                )
            
            return NewsResponse(articles=articles, total=len(articles))
            
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch news: {str(e)}")

@router.get("/news", response_model=NewsResponse)
async def get_news(category: Optional[str] = None, q: Optional[str] = None):
    """
    Fetch news articles.
    - category: Filter by category (business, entertainment, general, health, science, sports, technology)
    - q: Search query to find specific articles
    """
    return await fetch_news(category, q) 