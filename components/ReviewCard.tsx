import { Star, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Review } from '@/lib/mock-data'

interface ReviewCardProps {
  review: Review
  className?: string
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'star-filled' : 'star-empty'}
        />
      ))}
    </div>
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const AVATAR_COLORS = [
  'bg-brand-700 text-brand-50',
  'bg-blue-600 text-blue-50',
  'bg-purple-600 text-purple-50',
  'bg-orange-600 text-orange-50',
  'bg-pink-600 text-pink-50',
]

export default function ReviewCard({ review, className }: ReviewCardProps) {
  const colorIndex = review.authorName.charCodeAt(0) % AVATAR_COLORS.length

  return (
    <div className={cn('card-surface p-5', className)}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
          AVATAR_COLORS[colorIndex]
        )}>
          {getInitials(review.authorName)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-text-primary">{review.authorName}</span>
            {review.verified && (
              <span className="flex items-center gap-0.5 text-xs text-brand-700 font-medium">
                <BadgeCheck size={12} className="text-brand-600" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-text-muted">{review.authorYear}</span>
            <span className="text-border-default">·</span>
            <span className="text-xs text-text-muted">{formatDate(review.date)}</span>
          </div>
        </div>

        <StarRating rating={review.rating} />
      </div>

      {/* Content */}
      <h4 className="text-sm font-semibold text-text-primary mb-1.5">{review.headline}</h4>
      <p className="text-sm text-text-secondary leading-relaxed">{review.body}</p>
    </div>
  )
}
