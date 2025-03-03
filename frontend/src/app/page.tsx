'use client';

import { useEffect, useState } from 'react';
import ArticleCard, { ArticleCardSkeleton } from '@/components/ArticleCard';
import NewsControls from '@/components/NewsControls';
import { useNewsStore } from '@/store/newsStore';
import { useUserPreferencesStore } from '@/store/userPreferencesStore';
import UserPreferences from '@/components/UserPreferences';
import { Article } from '@/types/news';

export default function Home() {
    const { articles, loading, error, viewMode, fetchNews } = useNewsStore();
    const { preferredCategories, readingHistory } = useUserPreferencesStore();
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    // Function to calculate article score based on user preferences
    const getArticleScore = (article: Article): number => {
        let score = 0;

        // Category preference
        if (article.category && preferredCategories.includes(article.category)) {
            score += 2;
        }

        // Reading history category preference
        if (article.category) {
            const categoryCount = readingHistory.categories[article.category] || 0;
            score += categoryCount * 0.5;
        }

        // Sentiment preference based on reading history
        if (article.sentiment?.label) {
            const sentimentCount = readingHistory.sentiments[article.sentiment.label] || 0;
            score += sentimentCount * 0.3;
        }

        return score;
    };

    // Sort articles based on user preferences
    const sortedArticles = [...articles].sort((a, b) => getArticleScore(b) - getArticleScore(a));

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h1>
                        <p className="text-gray-600 dark:text-gray-300">{error}</p>
                        <button
                            onClick={() => fetchNews()}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        News Feed
                    </h1>
                    <button
                        onClick={() => setShowPreferences(!showPreferences)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        {showPreferences ? 'Hide Preferences' : 'Show Preferences'}
                    </button>
                </div>

                {showPreferences && (
                    <div className="mb-8">
                        <UserPreferences />
                    </div>
                )}

                <NewsControls />

                {loading ? (
                    <div className={`grid gap-6 ${
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                    }`}>
                        {[...Array(6)].map((_, i) => (
                            <ArticleCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className={`grid gap-6 ${
                        viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                    }`}>
                        {sortedArticles.map((article) => (
                            <ArticleCard
                                key={article.url}
                                article={article}
                                viewMode={viewMode}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
