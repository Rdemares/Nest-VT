'use client'

import { cn } from '@/lib/cn'
import type { AddOn } from '@/lib/mock-data'

interface AddOnToggleProps {
  addOn: AddOn
  checked: boolean
  onToggle: (id: string) => void
  className?: string
}

export default function AddOnToggle({ addOn, checked, onToggle, className }: AddOnToggleProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150',
        'hover:border-border-brand',
        checked
          ? 'border-brand-700 bg-brand-50 [data-theme=dark]:bg-brand-900/15'
          : 'border-border-default bg-bg-elevated',
        className
      )}
    >
      {/* Custom checkbox */}
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(addOn.id)}
          className="sr-only"
          aria-label={`Add ${addOn.name} for $${addOn.price}`}
        />
        <div className={cn(
          'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150',
          checked
            ? 'bg-brand-900 border-brand-900'
            : 'bg-bg-base border-border-default hover:border-border-brand'
        )}>
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            'text-sm font-semibold',
            checked ? 'text-brand-900 [data-theme=dark]:text-brand-300' : 'text-text-primary'
          )}>
            {addOn.name}
          </span>
          <span className={cn(
            'text-sm font-bold shrink-0',
            checked ? 'text-brand-800 [data-theme=dark]:text-brand-300' : 'text-text-primary'
          )}>
            +${addOn.price}
          </span>
        </div>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{addOn.description}</p>
      </div>
    </label>
  )
}
