import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Article } from '@/types/news';

export type ViewMode = 'grid' | 'list' | 'compact';
export type Category = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

interface NewsState {
    articles: Article[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    category: Category;
    viewMode: ViewMode;
    setArticles: (articles: Article[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    setCategory: (category: Category) => void;
    setViewMode: (mode: ViewMode) => void;
    fetchNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>()(
    persist(
        (set, get) => ({
            articles: [],
            loading: true,
            error: null,
            searchQuery: '',
            category: 'general',
            viewMode: 'grid',
            
            setArticles: (articles) => set({ articles }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            setSearchQuery: (query) => set({ searchQuery: query }),
            setCategory: (category) => set({ category }),
            setViewMode: (mode) => set({ viewMode: mode }),
            
            fetchNews: async () => {
                const { category, searchQuery } = get();
                set({ loading: true, error: null });
                
                try {
                    const params = new URLSearchParams();
                    if (category !== 'general') {
                        params.append('category', category);
                    }
                    if (searchQuery) {
                        params.append('q', searchQuery);
                    }
                    
                    const url = `/api/news${params.toString() ? `?${params.toString()}` : ''}`;
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch news');
                    }
                    
                    const data = await response.json();
                    set({ articles: data.articles });
                } catch (err) {
                    set({ error: 'Failed to load news articles. Please try again later.' });
                } finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: 'news-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                viewMode: state.viewMode,
                category: state.category,
            }),
        }
    )
); 