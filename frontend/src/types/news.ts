import { Category } from '@/store/newsStore';

export interface Sentiment {
    polarity: number;
    label: 'positive' | 'negative' | 'neutral';
}

export interface Article {
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source?: string;
    author?: string;
    sentiment?: Sentiment;
    category?: Category;
}

export interface NewsResponse {
    articles: Article[];
    total: number;
} 