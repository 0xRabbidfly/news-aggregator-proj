'use client';

import { Sentiment } from '@/types/news';

interface SentimentBadgeProps {
    sentiment: Sentiment;
    size?: 'sm' | 'md';
}

export default function SentimentBadge({ sentiment, size = 'md' }: SentimentBadgeProps) {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium";
    const sizeClasses = size === 'sm' ? 'text-xs' : 'text-sm';
    
    const colorClasses = {
        positive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        negative: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }[sentiment.label];

    return (
        <span className={`${baseClasses} ${sizeClasses} ${colorClasses}`}>
            {sentiment.label.charAt(0).toUpperCase() + sentiment.label.slice(1)}
            <span className="ml-1 text-xs">
                ({sentiment.polarity > 0 ? '+' : ''}{sentiment.polarity})
            </span>
        </span>
    );
} 