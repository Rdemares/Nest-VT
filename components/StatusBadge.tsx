import { cn } from '@/lib/cn'
import type { BookingStatus, ListingStatus, TourStatus } from '@/lib/mock-data'

type AnyStatus = BookingStatus | ListingStatus | TourStatus

interface StatusBadgeProps {
  status: AnyStatus
  className?: string
}

const STATUS_CONFIG: Record<string, { label: string; className: string; dot: string }> = {
  pending:     { label: 'Pending',     className: 'bg-amber-50 text-amber-800 border-amber-200',   dot: 'bg-amber-500' },
  confirmed:   { label: 'Confirmed',   className: 'bg-green-50 text-green-800 border-green-200',   dot: 'bg-green-500' },
  in_progress: { label: 'In Progress', className: 'bg-blue-50 text-blue-800 border-blue-200',      dot: 'bg-blue-500' },
  completed:   { label: 'Completed',   className: 'bg-gray-50 text-gray-700 border-gray-200',      dot: 'bg-gray-400' },
  cancelled:   { label: 'Cancelled',   className: 'bg-red-50 text-red-700 border-red-200',         dot: 'bg-red-400' },
  live:        { label: 'Live',        className: 'bg-green-50 text-green-800 border-green-200',   dot: 'bg-green-500' },
  in_review:   { label: 'In Review',   className: 'bg-purple-50 text-purple-800 border-purple-200', dot: 'bg-purple-500' },
  rejected:    { label: 'Rejected',    className: 'bg-red-50 text-red-700 border-red-200',         dot: 'bg-red-400' },
  scheduled:   { label: 'Scheduled',   className: 'bg-blue-50 text-blue-800 border-blue-200',      dot: 'bg-blue-500 animate-pulse' },
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG['pending']

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
      config.className,
      className
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  )
}
