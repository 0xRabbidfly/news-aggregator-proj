'use client'

import { useState, useEffect } from 'react'
import ArticleCard from '@/components/molecules/ArticleCard'
import { Article } from '@/types/article'

export default function ArticleGrid() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/news`)
        
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.status}`)
        }
        
        const data = await response.json()
        setArticles(data.articles || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please try again later.')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 my-4">
        <p className="font-medium">{error}</p>
        <p className="mt-2 text-sm">Please check your connection and try again.</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 my-4">
        <p className="font-medium">No articles found</p>
        <p className="mt-2 text-sm">Try adjusting your search or check back later for new content.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id || article.url} article={article} />
      ))}
    </div>
  )
} 