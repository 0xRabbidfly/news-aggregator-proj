'use client';

import Image from 'next/image';
import { Article } from '@/types/news';
import { formatDistanceToNow } from 'date-fns';
import { ViewMode } from '@/store/newsStore';
import SentimentBadge from './SentimentBadge';
import { useUserPreferencesStore } from '@/store/userPreferencesStore';

interface ArticleCardProps {
    article: Article;
    viewMode: ViewMode;
}

export default function ArticleCard({ article, viewMode }: ArticleCardProps) {
    const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
    const { showImages, addReadArticle } = useUserPreferencesStore();

    const handleReadMore = () => {
        addReadArticle({
            url: article.url,
            timestamp: Date.now(),
            category: article.category,
            sentiment: article.sentiment?.label
        });
        window.open(article.url, '_blank');
    };

    if (viewMode === 'compact') {
        return (
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-32 w-full">
                    {showImages && article.urlToImage ? (
                        <Image
                            src={article.urlToImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image</span>
                        </div>
                    )}
                    {article.sentiment && (
                        <div className="absolute top-2 right-2">
                            <SentimentBadge sentiment={article.sentiment} size="sm" />
                        </div>
                    )}
                </div>
                <div className="p-3">
                    <h2 className="text-sm font-semibold mb-1 line-clamp-2 text-gray-900 dark:text-white">
                        {article.title}
                    </h2>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{article.source || 'Unknown'}</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </article>
        );
    }

    if (viewMode === 'list') {
        return (
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="flex">
                    {showImages && (
                        <div className="relative h-48 w-48 flex-shrink-0">
                            {article.urlToImage ? (
                                <Image
                                    src={article.urlToImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 33vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                            {article.sentiment && (
                                <div className="absolute top-2 right-2">
                                    <SentimentBadge sentiment={article.sentiment} size="sm" />
                                </div>
                            )}
                        </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {article.title}
                        </h2>
                        {article.description && (
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                {article.description}
                            </p>
                        )}
                        <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{article.source || 'Unknown source'}</span>
                            <span>{formattedDate}</span>
                        </div>
                        <button
                            onClick={handleReadMore}
                            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Read more
                        </button>
                    </div>
                </div>
            </article>
        );
    }

    // Default grid view
    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {showImages && (
                <div className="relative h-48 w-full">
                    {article.urlToImage ? (
                        <Image
                            src={article.urlToImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                    {article.sentiment && (
                        <div className="absolute top-2 right-2">
                            <SentimentBadge sentiment={article.sentiment} />
                        </div>
                    )}
                </div>
            )}
            
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                    {article.title}
                </h2>
                
                {article.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {article.description}
                    </p>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.source || 'Unknown source'}</span>
                    <span>{formattedDate}</span>
                </div>
                
                <button
                    onClick={handleReadMore}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Read more
                </button>
            </div>
        </article>
    );
}

export function ArticleCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="mt-4 h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            </div>
        </div>
    );
} 