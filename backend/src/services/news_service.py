import os
import httpx
from typing import Optional, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment
NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_BASE_URL = "https://newsapi.org/v2"

async def get_news_articles(
    category: Optional[str] = None,
    query: Optional[str] = None,
    page: int = 1,
    page_size: int = 20
) -> Dict[str, Any]:
    """
    Fetch news articles from NewsAPI.
    
    Args:
        category: Optional category to filter articles
        query: Optional search query
        page: Page number for pagination
        page_size: Number of articles per page
        
    Returns:
        Dictionary containing status, total results, and list of articles
    """
    if not NEWS_API_KEY:
        raise ValueError("NEWS_API_KEY environment variable is not set")
    
    # Build parameters
    params = {
        "apiKey": NEWS_API_KEY,
        "page": page,
        "pageSize": page_size,
        "language": "en",
    }
    
    # Add optional parameters if provided
    if category:
        params["category"] = category
    
    if query:
        params["q"] = query
    
    # Determine endpoint based on parameters
    endpoint = f"{NEWS_API_BASE_URL}/top-headlines" if category else f"{NEWS_API_BASE_URL}/everything"
    
    # If no category and no query, default to general news
    if not category and not query:
        params["category"] = "general"
        endpoint = f"{NEWS_API_BASE_URL}/top-headlines"
    
    # Make API request
    async with httpx.AsyncClient() as client:
        response = await client.get(endpoint, params=params)
        
        if response.status_code != 200:
            error_data = response.json()
            error_message = error_data.get("message", "Unknown error")
            raise Exception(f"NewsAPI error: {error_message}")
        
        return response.json() 