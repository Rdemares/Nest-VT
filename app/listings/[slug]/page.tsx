import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Bed, Bath, Ruler, Star, Wifi, Car, PawPrint, Waves, ArrowRight, Calendar, Phone, CheckCircle2 } from 'lucide-react'
import PhotoGallery from '@/components/PhotoGallery'
import ReviewCard from '@/components/ReviewCard'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import StatusBadge from '@/components/StatusBadge'
import { PROPERTIES, getPropertyBySlug, getReviewsForProperty } from '@/lib/mock-data'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug)
  if (!property) return { title: 'Listing Not Found' }
  return {
    title: `${property.title} — ${property.neighborhood}`,
    description: property.description.slice(0, 160),
  }
}

export default function ListingDetailPage({ params }: Props) {
  const property = getPropertyBySlug(params.slug)
  if (!property) notFound()

  const reviews = getReviewsForProperty(property.id)
  const bedroomLabel = property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbNav
          crumbs={[
            { label: 'Listings', href: '/listings' },
            { label: property.neighborhood, href: '/listings' },
            { label: property.title },
          ]}
          className="mb-5"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PhotoGallery images={property.images} title={property.title} />

            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
                  {property.title}
                </h1>
                <StatusBadge status={property.status} className="shrink-0 mt-1" />
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={15} className="text-text-muted shrink-0" />
                <span className="text-text-secondary">
                  {property.address}, {property.neighborhood}, Burlington, VT {property.zip}
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Bed size={16} className="text-text-muted" />
                  {bedroomLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath size={16} className="text-text-muted" />
                  {property.bathrooms} bath
                </span>
                <span className="flex items-center gap-1.5">
                  <Ruler size={16} className="text-text-muted" />
                  {property.distanceToUvm} mi to UVM
                </span>
                {reviews.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={14} className="star-filled" />
                    <strong>{property.rating}</strong>
                    <span className="text-text-muted">({property.reviewCount} reviews)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2">
              {property.utilitiesIncluded && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-800 border border-brand-200">
                  <CheckCircle2 size={12} />
                  Utilities included
                </span>
              )}
              {property.parkingIncluded && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 text-brand-800 border border-brand-200">
                  <Car size={12} />
                  Parking included
                </span>
              )}
              {property.petsAllowed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                  <PawPrint size={12} />
                  Pets welcome
                </span>
              )}
              {property.laundry === 'in_unit' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200">
                  <Waves size={12} />
                  In-unit laundry
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-bg-subtle text-text-secondary border border-border-default">
                <Calendar size={12} />
                Available {new Date(property.availableFrom).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-3">About this property</h2>
              <p className="text-text-secondary leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 size={14} className="text-brand-700 shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-3">Location</h2>
              <div className="rounded-xl overflow-hidden border border-border-default bg-bg-subtle h-56 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 opacity-40" />
                <div className="text-center relative">
                  <MapPin size={32} className="text-brand-700 mx-auto mb-2" />
                  <p className="font-semibold text-text-primary text-sm">{property.address}</p>
                  <p className="text-text-secondary text-xs">{property.neighborhood}, Burlington, VT</p>
                  <p className="text-brand-700 text-xs font-medium mt-1">{property.distanceToUvm} miles from UVM campus</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {reviews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-text-primary">
                    Reviews
                    <span className="ml-2 text-sm font-normal text-text-muted">({reviews.length})</span>
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <Star size={15} className="star-filled" />
                    <span className="font-bold text-text-primary">{property.rating}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="card-surface p-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-text-primary">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-text-muted">/mo</span>
                </div>
                <p className="text-xs text-text-muted mb-4">
                  {property.utilitiesIncluded ? 'All utilities included' : 'Utilities not included'}
                </p>

                <Link
                  href="/packages/checkout"
                  className="btn-brand w-full py-3 rounded-xl text-sm font-semibold justify-center mb-3"
                >
                  Book a Tour — from $199
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/packages"
                  className="btn-brand btn-outline w-full py-2.5 rounded-xl text-sm font-semibold justify-center"
                >
                  See All Packages
                </Link>

                <div className="mt-4 pt-4 border-t border-border-default">
                  <p className="text-xs text-text-muted text-center leading-relaxed">
                    A personal coordinator will contact you within 24 hours to schedule your tour.
                  </p>
                </div>
              </div>

              {/* Details card */}
              <div className="card-surface p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Property Details</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Type', value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
                    { label: 'Bedrooms', value: property.bedrooms === 0 ? 'Studio' : String(property.bedrooms) },
                    { label: 'Bathrooms', value: String(property.bathrooms) },
                    { label: 'Available', value: new Date(property.availableFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                    { label: 'Distance to UVM', value: `${property.distanceToUvm} miles` },
                    { label: 'Laundry', value: property.laundry === 'in_unit' ? 'In-unit' : property.laundry === 'in_building' ? 'In building' : 'None' },
                    { label: 'Parking', value: property.parkingIncluded ? 'Included' : 'Not included' },
                    { label: 'Pets', value: property.petsAllowed ? 'Allowed' : 'Not allowed' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">{label}</span>
                      <span className="text-text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact card */}
              <div className="card-surface p-5 bg-brand-50 border-brand-200">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={15} className="text-brand-700" />
                  <span className="text-sm font-semibold text-brand-900">Questions?</span>
                </div>
                <p className="text-xs text-brand-800 mb-3">
                  Book a package and a coordinator will answer every question about this property.
                </p>
                <Link href="/packages" className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1">
                  View packages <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
