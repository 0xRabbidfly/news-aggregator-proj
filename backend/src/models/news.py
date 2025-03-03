from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional

class Source(BaseModel):
    id: Optional[str] = None
    name: str

class Article(BaseModel):
    source: Source
    author: Optional[str] = None
    title: str
    description: Optional[str] = None
    url: HttpUrl
    urlToImage: Optional[HttpUrl] = None
    publishedAt: str
    content: Optional[str] = None

class ArticleResponse(BaseModel):
    status: str
    totalResults: int
    articles: List[Article] 