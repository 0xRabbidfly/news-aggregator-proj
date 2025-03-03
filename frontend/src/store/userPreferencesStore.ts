import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Category, ViewMode } from './newsStore';

export interface ReadArticle {
    url: string;
    timestamp: number;
    category?: Category;
    sentiment?: string;
}

interface CategoryHistory {
    [category: string]: number;
}

interface SentimentHistory {
    [sentiment: string]: number;
}

interface ReadingHistory {
    categories: CategoryHistory;
    sentiments: SentimentHistory;
}

interface UserPreferences {
    defaultViewMode: ViewMode;
    preferredCategories: Category[];
    isDarkMode: boolean;
    showImages: boolean;
    compactView: boolean;
    readArticles: ReadArticle[];
    readingHistory: ReadingHistory;
}

interface UserPreferencesState extends UserPreferences {
    setDefaultViewMode: (mode: ViewMode) => void;
    togglePreferredCategory: (category: Category) => void;
    setDarkMode: (isDark: boolean) => void;
    setShowImages: (show: boolean) => void;
    setCompactView: (compact: boolean) => void;
    addReadArticle: (article: ReadArticle) => void;
    clearReadingHistory: () => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
    defaultViewMode: 'grid',
    preferredCategories: ['general'],
    isDarkMode: false,
    showImages: true,
    compactView: false,
    readArticles: [],
    readingHistory: {
        categories: {
            general: 0,
            business: 0,
            entertainment: 0,
            health: 0,
            science: 0,
            sports: 0,
            technology: 0,
        },
        sentiments: {
            positive: 0,
            negative: 0,
            neutral: 0
        }
    }
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
    persist(
        (set, get) => ({
            ...DEFAULT_PREFERENCES,

            setDefaultViewMode: (mode) => set({ defaultViewMode: mode }),

            togglePreferredCategory: (category) => set((state) => {
                const categories = new Set(state.preferredCategories);
                if (categories.has(category)) {
                    categories.delete(category);
                } else {
                    categories.add(category);
                }
                return { preferredCategories: Array.from(categories) };
            }),

            setDarkMode: (isDark) => set({ isDarkMode: isDark }),

            setShowImages: (show) => set({ showImages: show }),

            setCompactView: (compact) => set({ compactView: compact }),

            addReadArticle: (article) => set((state) => {
                const newReadArticles = [
                    article,
                    ...state.readArticles.filter(a => a.url !== article.url)
                ].slice(0, 100); // Keep only last 100 articles

                const newHistory = { ...state.readingHistory };
                if (article.category) {
                    newHistory.categories[article.category] = (newHistory.categories[article.category] || 0) + 1;
                }
                if (article.sentiment) {
                    newHistory.sentiments[article.sentiment] = (newHistory.sentiments[article.sentiment] || 0) + 1;
                }

                return {
                    readArticles: newReadArticles,
                    readingHistory: newHistory
                };
            }),

            clearReadingHistory: () => set((state) => ({
                readArticles: [],
                readingHistory: DEFAULT_PREFERENCES.readingHistory
            }))
        }),
        {
            name: 'user-preferences',
            storage: createJSONStorage(() => localStorage),
        }
    )
); 