'use client'

import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { NEIGHBORHOODS, PROPERTY_TYPES } from '@/lib/mock-data'
import type { PropertyType } from '@/lib/mock-data'

export interface FilterState {
  priceMin: number
  priceMax: number
  bedrooms: number | null
  type: PropertyType | null
  maxDistance: number | null
  neighborhood: string | null
}

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  totalCount: number
  filteredCount: number
  className?: string
}

const BEDROOM_OPTIONS = [
  { label: 'Studio', value: 0 },
  { label: '1 BR', value: 1 },
  { label: '2 BR', value: 2 },
  { label: '3 BR', value: 3 },
  { label: '4+ BR', value: 4 },
]

const DISTANCE_OPTIONS = [
  { label: 'Under 0.5 mi', value: 0.5 },
  { label: 'Under 1 mi', value: 1 },
  { label: 'Under 1.5 mi', value: 1.5 },
  { label: 'Any distance', value: null },
]

export const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 5000,
  bedrooms: null,
  type: null,
  maxDistance: null,
  neighborhood: null,
}

export function applyFilters(properties: import('@/lib/mock-data').Property[], filters: FilterState) {
  return properties.filter((p) => {
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false
    if (filters.bedrooms !== null) {
      if (filters.bedrooms === 4 ? p.bedrooms < 4 : p.bedrooms !== filters.bedrooms) return false
    }
    if (filters.type && p.type !== filters.type) return false
    if (filters.maxDistance !== null && p.distanceToUvm > filters.maxDistance) return false
    if (filters.neighborhood && p.neighborhood !== filters.neighborhood) return false
    return true
  })
}

export default function FilterBar({ filters, onChange, totalCount, filteredCount, className }: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeCount = [
    filters.bedrooms !== null,
    filters.type !== null,
    filters.maxDistance !== null,
    filters.neighborhood !== null,
    filters.priceMax < 5000,
  ].filter(Boolean).length

  const reset = () => onChange(DEFAULT_FILTERS)

  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial })

  return (
    <div className={cn('', className)}>
      {/* Desktop filter row */}
      <div className="hidden md:flex items-center gap-3 flex-wrap">
        {/* Price range */}
        <div className="flex items-center gap-2">
          <select
            value={filters.priceMax}
            onChange={(e) => update({ priceMax: Number(e.target.value) })}
            className="input-base w-auto text-sm py-2 pr-8 cursor-pointer"
            aria-label="Max price"
          >
            <option value={5000}>Any price</option>
            <option value={1200}>Up to $1,200</option>
            <option value={1500}>Up to $1,500</option>
            <option value={2000}>Up to $2,000</option>
            <option value={2500}>Up to $2,500</option>
            <option value={3000}>Up to $3,000</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex items-center gap-1.5">
          {BEDROOM_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => update({ bedrooms: filters.bedrooms === value ? null : value })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150',
                filters.bedrooms === value
                  ? 'bg-brand-900 text-white border-brand-900'
                  : 'border-border-default text-text-secondary hover:border-border-brand hover:text-text-brand bg-bg-elevated'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Type */}
        <select
          value={filters.type ?? ''}
          onChange={(e) => update({ type: (e.target.value as PropertyType) || null })}
          className="input-base w-auto text-sm py-2 pr-8 cursor-pointer"
          aria-label="Property type"
        >
          <option value="">All types</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>

        {/* Distance */}
        <select
          value={filters.maxDistance ?? ''}
          onChange={(e) => update({ maxDistance: e.target.value ? Number(e.target.value) : null })}
          className="input-base w-auto text-sm py-2 pr-8 cursor-pointer"
          aria-label="Distance to UVM"
        >
          {DISTANCE_OPTIONS.map(({ label, value }) => (
            <option key={label} value={value ?? ''}>{label}</option>
          ))}
        </select>

        {/* Neighborhood */}
        <select
          value={filters.neighborhood ?? ''}
          onChange={(e) => update({ neighborhood: e.target.value || null })}
          className="input-base w-auto text-sm py-2 pr-8 cursor-pointer"
          aria-label="Neighborhood"
        >
          <option value="">All neighborhoods</option>
          {NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        {activeCount > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-red-600 transition-colors font-medium px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <X size={14} />
            Clear ({activeCount})
          </button>
        )}

        <span className="text-sm text-text-muted ml-auto">
          {filteredCount === totalCount ? `${totalCount} listings` : `${filteredCount} of ${totalCount} listings`}
        </span>
      </div>

      {/* Mobile filter button */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-default bg-bg-elevated text-sm font-medium text-text-secondary hover:border-border-brand transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeCount > 0 && (
            <span className="bg-brand-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        <span className="text-sm text-text-muted">
          {filteredCount} listings
        </span>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-bg-base rounded-t-2xl shadow-2xl p-5 pb-safe md:hidden max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-text-primary">Filters</h3>
              <button onClick={() => setMobileOpen(false)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="label-base">Max Price</label>
                <select
                  value={filters.priceMax}
                  onChange={(e) => update({ priceMax: Number(e.target.value) })}
                  className="input-base"
                >
                  <option value={5000}>Any price</option>
                  <option value={1200}>Up to $1,200</option>
                  <option value={1500}>Up to $1,500</option>
                  <option value={2000}>Up to $2,000</option>
                  <option value={2500}>Up to $2,500</option>
                  <option value={3000}>Up to $3,000</option>
                </select>
              </div>

              <div>
                <label className="label-base">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {BEDROOM_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => update({ bedrooms: filters.bedrooms === value ? null : value })}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                        filters.bedrooms === value
                          ? 'bg-brand-900 text-white border-brand-900'
                          : 'border-border-default text-text-secondary hover:border-border-brand bg-bg-elevated'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label-base">Property Type</label>
                <select value={filters.type ?? ''} onChange={(e) => update({ type: (e.target.value as PropertyType) || null })} className="input-base">
                  <option value="">All types</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-base">Distance to UVM</label>
                <select value={filters.maxDistance ?? ''} onChange={(e) => update({ maxDistance: e.target.value ? Number(e.target.value) : null })} className="input-base">
                  {DISTANCE_OPTIONS.map(({ label, value }) => (
                    <option key={label} value={value ?? ''}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-base">Neighborhood</label>
                <select value={filters.neighborhood ?? ''} onChange={(e) => update({ neighborhood: e.target.value || null })} className="input-base">
                  <option value="">All neighborhoods</option>
                  {NEIGHBORHOODS.map((n) => (<option key={n} value={n}>{n}</option>))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {activeCount > 0 && (
                <button onClick={() => { reset(); setMobileOpen(false) }} className="flex-1 py-3 rounded-xl border border-border-default text-sm font-semibold text-text-secondary hover:bg-bg-subtle transition-colors">
                  Clear All
                </button>
              )}
              <button onClick={() => setMobileOpen(false)} className="flex-1 btn-brand py-3 rounded-xl text-sm font-semibold">
                Show {filteredCount} Listings
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
