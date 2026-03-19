import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Star, Ruler } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Property } from '@/lib/mock-data'

interface ListingCardProps {
  property: Property
  className?: string
  featured?: boolean
}

export default function ListingCard({ property, className, featured }: ListingCardProps) {
  const bedroomLabel = property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} BR`
  const bathLabel = `${property.bathrooms} BA`

  return (
    <Link
      href={`/listings/${property.slug}`}
      className={cn(
        'group block card-surface card-hover overflow-hidden',
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {featured && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gold-500 text-white shadow-gold-sm">
              Featured
            </span>
          )}
          {property.utilitiesIncluded && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-900/90 text-white">
              Utilities Incl.
            </span>
          )}
        </div>

        {/* Price pill */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-white/95 text-brand-900 shadow-brand-sm">
            ${property.price.toLocaleString()}<span className="font-normal text-xs text-brand-700 ml-0.5">/mo</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-text-primary text-base leading-snug group-hover:text-text-brand transition-colors line-clamp-1">
            {property.title}
          </h3>
          {/* Rating */}
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="star-filled" />
            <span className="text-sm font-semibold text-text-primary">{property.rating}</span>
            <span className="text-xs text-text-muted">({property.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={13} className="text-text-muted shrink-0" />
          <span className="text-sm text-text-secondary truncate">
            {property.address}, {property.neighborhood}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span className="flex items-center gap-1">
            <Bed size={14} className="text-text-muted" />
            {bedroomLabel}
          </span>
          <span className="w-1 h-1 rounded-full bg-border-default" />
          <span className="flex items-center gap-1">
            <Bath size={14} className="text-text-muted" />
            {bathLabel}
          </span>
          <span className="w-1 h-1 rounded-full bg-border-default" />
          <span className="flex items-center gap-1">
            <Ruler size={14} className="text-text-muted" />
            {property.distanceToUvm} mi
          </span>
        </div>
      </div>
    </Link>
  )
}
