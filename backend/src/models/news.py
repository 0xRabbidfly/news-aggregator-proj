from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Union, Literal
from datetime import datetime

CategoryType = Literal['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology']

class Sentiment(BaseModel):
    polarity: float
    label: str

class Article(BaseModel):
    title: str
    description: Optional[str] = None
    url: HttpUrl
    urlToImage: Optional[HttpUrl] = None
    publishedAt: str
    source: Optional[str] = None
    author: Optional[str] = None
    sentiment: Optional[Sentiment] = None
    category: CategoryType = 'general'

class NewsResponse(BaseModel):
    articles: List[Article]
    total: int 