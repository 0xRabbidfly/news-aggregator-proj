'use client'

import Image from 'next/image'
import { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    url,
    author
  } = article

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const placeholderImage = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={urlToImage || placeholderImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = placeholderImage
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {source.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
        )}
        {author && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            By {author}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  )
} 