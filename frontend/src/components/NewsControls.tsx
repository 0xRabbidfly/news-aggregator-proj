'use client';

import { useNewsStore, type Category, type ViewMode } from '@/store/newsStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

const categories: Category[] = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
];

const viewModes: { value: ViewMode; label: string }[] = [
    { value: 'grid', label: 'Grid' },
    { value: 'list', label: 'List' },
    { value: 'compact', label: 'Compact' }
];

export default function NewsControls() {
    const {
        searchQuery,
        category,
        viewMode,
        setSearchQuery,
        setCategory,
        setViewMode,
        fetchNews
    } = useNewsStore();

    // Debounce the search to avoid too many API calls
    const debouncedFetch = useCallback(
        debounce(() => {
            fetchNews();
        }, 300),
        [fetchNews]
    );

    useEffect(() => {
        debouncedFetch();
        return () => {
            debouncedFetch.cancel();
        };
    }, [searchQuery, category, debouncedFetch]);

    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Category selector */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                {/* View mode selector */}
                <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    {viewModes.map((mode) => (
                        <option key={mode.value} value={mode.value}>
                            {mode.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
} 