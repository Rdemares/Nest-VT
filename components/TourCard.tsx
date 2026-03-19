import { Calendar, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import StatusBadge from './StatusBadge'
import type { Tour } from '@/lib/mock-data'

interface TourCardProps {
  tour: Tour
  className?: string
  onCancel?: (id: string) => void
  onReschedule?: (id: string) => void
}

function formatTourDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  })
}

export default function TourCard({ tour, className, onCancel, onReschedule }: TourCardProps) {
  const isUpcoming = tour.status === 'scheduled'
  const isPast = tour.status === 'completed'

  return (
    <div className={cn(
      'card-surface p-4',
      isUpcoming && 'border-l-4 border-l-brand-700',
      isPast && 'opacity-75',
      className
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={13} className="text-text-muted shrink-0" />
            <span className="text-sm font-semibold text-text-primary">{tour.propertyAddress}</span>
          </div>
        </div>
        <StatusBadge status={tour.status} />
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Calendar size={13} className="text-text-muted" />
          {formatTourDate(tour.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Clock size={13} className="text-text-muted" />
          {tour.time}
        </div>
      </div>

      {tour.notes && (
        <p className="text-xs text-text-muted bg-bg-subtle px-3 py-2 rounded-lg mb-3 leading-relaxed">
          {tour.notes}
        </p>
      )}

      {isUpcoming && (onCancel || onReschedule) && (
        <div className="flex items-center gap-2 pt-2 border-t border-border-default">
          {onReschedule && (
            <button
              onClick={() => onReschedule(tour.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-brand transition-colors px-2.5 py-1.5 rounded-lg hover:bg-bg-subtle"
            >
              <CheckCircle2 size={12} />
              Reschedule
            </button>
          )}
          {onCancel && (
            <button
              onClick={() => onCancel(tour.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50"
            >
              <XCircle size={12} />
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  )
}
