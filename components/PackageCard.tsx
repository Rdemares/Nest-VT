'use client'

import { Check, Zap } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Package } from '@/lib/mock-data'

interface PackageCardProps {
  pkg: Package
  selected?: boolean
  onSelect?: (id: string) => void
  className?: string
}

export default function PackageCard({ pkg, selected, onSelect, className }: PackageCardProps) {
  const isPremium = pkg.highlighted

  return (
    <button
      onClick={() => onSelect?.(pkg.id)}
      className={cn(
        'relative w-full text-left rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2',
        selected
          ? isPremium
            ? 'border-gold-500 bg-bg-elevated shadow-gold-md'
            : 'border-brand-900 bg-bg-elevated shadow-brand-md'
          : 'border-border-default bg-bg-elevated hover:border-border-brand hover:shadow-brand-sm',
        className
      )}
      role="radio"
      aria-checked={selected}
    >
      {/* Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gold-500 text-white shadow-gold-sm whitespace-nowrap">
            <Zap size={10} />
            {pkg.badge}
          </span>
        </div>
      )}

      {/* Selected indicator */}
      {selected && (
        <div className={cn(
          'absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center',
          isPremium ? 'bg-gold-500' : 'bg-brand-900'
        )}>
          <Check size={13} className="text-white" strokeWidth={3} />
        </div>
      )}

      <div className="mb-4">
        <h3 className={cn(
          'text-xl font-bold mb-1',
          isPremium ? 'gold-gradient-text' : 'text-text-primary'
        )}>
          {pkg.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">{pkg.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold text-text-primary">${pkg.price}</span>
        <span className="text-text-muted text-sm ml-1">one-time</span>
      </div>

      <ul className="space-y-3">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className={cn(
              'mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0',
              isPremium ? 'bg-gold-500/15' : 'bg-brand-100'
            )}>
              <Check
                size={9}
                strokeWidth={3}
                className={cn(isPremium ? 'text-gold-500' : 'text-brand-800')}
              />
            </div>
            <span className="text-sm text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      <div className={cn(
        'mt-6 w-full py-3 rounded-xl text-sm font-semibold text-center transition-colors',
        selected
          ? isPremium
            ? 'bg-gold-500 text-white'
            : 'bg-brand-900 text-white'
          : isPremium
            ? 'bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-white border border-gold-500/30'
            : 'bg-brand-50 text-brand-900 border border-brand-200 hover:bg-brand-900 hover:text-white'
      )}>
        {selected ? 'Selected' : `Choose ${pkg.name}`}
      </div>
    </button>
  )
}
