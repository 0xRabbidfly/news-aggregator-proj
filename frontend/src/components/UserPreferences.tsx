import { useUserPreferencesStore } from '@/store/userPreferencesStore';
import { Category, ViewMode } from '@/store/newsStore';
import { Switch } from '@headlessui/react';
import { useEffect } from 'react';

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

export default function UserPreferences() {
    const {
        defaultViewMode,
        preferredCategories,
        isDarkMode,
        showImages,
        compactView,
        readingHistory,
        setDefaultViewMode,
        togglePreferredCategory,
        setDarkMode,
        setShowImages,
        setCompactView,
        clearReadingHistory
    } = useUserPreferencesStore();

    // Apply dark mode on mount and when preference changes
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                User Preferences
            </h2>

            {/* View Mode */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Default View Mode
                </h3>
                <div className="flex gap-4">
                    {viewModes.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setDefaultViewMode(value)}
                            className={`px-4 py-2 rounded-md ${
                                defaultViewMode === value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preferred Categories */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Preferred Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => togglePreferredCategory(category)}
                            className={`px-4 py-2 rounded-md capitalize ${
                                preferredCategories.includes(category)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Display Settings
                </h3>
                
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                    <Switch
                        checked={isDarkMode}
                        onChange={setDarkMode}
                        className={`${
                            isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${
                                isDarkMode ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Show Images</span>
                    <Switch
                        checked={showImages}
                        onChange={setShowImages}
                        className={`${
                            showImages ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${
                                showImages ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Compact View</span>
                    <Switch
                        checked={compactView}
                        onChange={setCompactView}
                        className={`${
                            compactView ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                        <span
                            className={`${
                                compactView ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                </div>
            </div>

            {/* Reading History */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Reading History
                    </h3>
                    <button
                        onClick={clearReadingHistory}
                        className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                        Clear History
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Stats */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Categories Read
                        </h4>
                        <div className="space-y-2">
                            {Object.entries(readingHistory.categories).map(([category, count]) => (
                                <div key={category} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                        {category}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sentiment Stats */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Sentiment Distribution
                        </h4>
                        <div className="space-y-2">
                            {Object.entries(readingHistory.sentiments).map(([sentiment, count]) => (
                                <div key={sentiment} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                        {sentiment}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 