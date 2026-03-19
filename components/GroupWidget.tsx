'use client'

import { useState } from 'react'
import { Users, Plus, Minus, Tag } from 'lucide-react'
import { cn } from '@/lib/cn'
import { getGroupDiscountPercent } from '@/lib/mock-data'

interface GroupWidgetProps {
  groupSize: number
  onGroupSizeChange: (size: number) => void
  emails: string[]
  onEmailsChange: (emails: string[]) => void
  packagePrice: number
  className?: string
}

export default function GroupWidget({
  groupSize,
  onGroupSizeChange,
  emails,
  onEmailsChange,
  packagePrice,
  className,
}: GroupWidgetProps) {
  const [enabled, setEnabled] = useState(groupSize > 1)

  const discountPct = getGroupDiscountPercent(groupSize)
  const discountAmount = Math.round((packagePrice * discountPct) / 100)

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false)
      onGroupSizeChange(1)
      onEmailsChange([])
    } else {
      setEnabled(true)
      onGroupSizeChange(3)
      onEmailsChange(['', ''])
    }
  }

  const handleSizeChange = (delta: number) => {
    const newSize = Math.max(1, Math.min(5, groupSize + delta))
    onGroupSizeChange(newSize)
    if (newSize > 1) {
      const needed = newSize - 1
      const newEmails = [...emails]
      while (newEmails.length < needed) newEmails.push('')
      while (newEmails.length > needed) newEmails.pop()
      onEmailsChange(newEmails)
    } else {
      onEmailsChange([])
    }
  }

  return (
    <div className={cn('card-surface p-5', className)}>
      {/* Header toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-brand-700" />
          <span className="text-sm font-semibold text-text-primary">Group Booking</span>
        </div>
        <button
          onClick={handleToggle}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
            enabled ? 'bg-brand-900' : 'bg-border-default'
          )}
          role="switch"
          aria-checked={enabled}
          aria-label="Enable group booking"
        >
          <span className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )} />
        </button>
      </div>

      <p className="text-xs text-text-muted mb-4">
        Booking with roommates? Add group members to unlock discounts.
      </p>

      {/* Discount tiers */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { size: 3, pct: 8 },
          { size: 4, pct: 10 },
          { size: 5, pct: 12 },
        ].map(({ size, pct }) => (
          <div
            key={size}
            className={cn(
              'text-center px-2 py-2 rounded-lg border text-xs',
              enabled && groupSize >= size
                ? 'border-brand-700 bg-brand-50 text-brand-900 [data-theme=dark]:bg-brand-900/15 [data-theme=dark]:text-brand-300'
                : 'border-border-default text-text-muted'
            )}
          >
            <div className="font-bold">{pct}% off</div>
            <div>{size} students</div>
          </div>
        ))}
      </div>

      {enabled && (
        <>
          {/* Group size control */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-secondary font-medium">Group size</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSizeChange(-1)}
                disabled={groupSize <= 2}
                className="w-8 h-8 rounded-lg border border-border-default flex items-center justify-center text-text-secondary hover:border-border-brand hover:text-text-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Decrease group size"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-bold text-text-primary">{groupSize}</span>
              <button
                onClick={() => handleSizeChange(1)}
                disabled={groupSize >= 5}
                className="w-8 h-8 rounded-lg border border-border-default flex items-center justify-center text-text-secondary hover:border-border-brand hover:text-text-brand transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase group size"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Email inputs */}
          <div className="space-y-2 mb-4">
            <label className="label-base">Roommate emails <span className="text-text-muted font-normal">(optional)</span></label>
            {emails.map((email, i) => (
              <input
                key={i}
                type="email"
                value={email}
                onChange={(e) => {
                  const next = [...emails]
                  next[i] = e.target.value
                  onEmailsChange(next)
                }}
                placeholder={`Roommate ${i + 1} email`}
                className="input-base text-sm"
              />
            ))}
          </div>

          {/* Discount display */}
          {discountPct > 0 && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-brand-50 border border-brand-200 [data-theme=dark]:bg-brand-900/15">
              <Tag size={14} className="text-brand-700 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-brand-800 [data-theme=dark]:text-brand-300">
                  {discountPct}% group discount applied!
                </span>
                <span className="text-brand-700 [data-theme=dark]:text-brand-400 ml-1">
                  Save ${discountAmount} on the package price.
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
