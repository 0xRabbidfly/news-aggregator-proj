from fastapi import APIRouter
from newsapi import NewsApiClient
from src.api.news_router import router

# Re-export the router
# This file exists to maintain compatibility with the import in main.py 