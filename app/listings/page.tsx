'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import FilterBar, { FilterState, DEFAULT_FILTERS, applyFilters } from '@/components/FilterBar'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { PROPERTIES } from '@/lib/mock-data'

export default function ListingsPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filtered = applyFilters(PROPERTIES, filters)

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="bg-bg-subtle border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav crumbs={[{ label: 'Listings' }]} className="mb-3" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">Burlington Rentals</h1>
              <p className="text-text-secondary text-sm flex items-center gap-1.5">
                <MapPin size={14} />
                Near University of Vermont campus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter bar */}
        <div className="mb-6">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            totalCount={PROPERTIES.length}
            filteredCount={filtered.length}
          />
        </div>

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-bg-subtle border border-border-default flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No listings match your filters</h3>
            <p className="text-text-secondary text-sm mb-4">Try adjusting or clearing your filters to see more results.</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="btn-brand px-5 py-2.5 rounded-xl text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
