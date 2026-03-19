import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  crumbs: Crumb[]
  className?: string
}

export default function BreadcrumbNav({ crumbs, className }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm', className)}
    >
      <Link
        href="/"
        className="flex items-center text-text-muted hover:text-text-brand transition-colors"
        aria-label="Home"
      >
        <Home size={14} />
      </Link>

      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight size={13} className="text-text-muted" />
          {crumb.href && index < crumbs.length - 1 ? (
            <Link
              href={crumb.href}
              className="text-text-muted hover:text-text-brand transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span
              className="text-text-secondary font-medium"
              aria-current={index === crumbs.length - 1 ? 'page' : undefined}
            >
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
