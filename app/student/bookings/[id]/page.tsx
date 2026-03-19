import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, Download, Mail, Phone } from 'lucide-react'
import StatusBadge from '@/components/StatusBadge'
import TourCard from '@/components/TourCard'
import StepperNav from '@/components/StepperNav'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { BOOKINGS, getBookingById } from '@/lib/mock-data'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return BOOKINGS.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const booking = getBookingById(params.id)
  if (!booking) return { title: 'Booking Not Found' }
  return { title: `Booking — ${booking.packageName}` }
}

const BOOKING_STEPS = [
  { id: 'booked', label: 'Booked', description: 'Package purchased' },
  { id: 'assigned', label: 'Coordinator Assigned', description: 'Personal coordinator assigned' },
  { id: 'touring', label: 'Touring', description: 'Property tours scheduled' },
  { id: 'review', label: 'Lease Review', description: 'Lease review underway' },
  { id: 'complete', label: 'Complete', description: 'Signed & moved in' },
]

function getStepFromStatus(status: string): number {
  switch (status) {
    case 'pending': return 0
    case 'confirmed': return 2
    case 'in_progress': return 3
    case 'completed': return 5
    default: return 1
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })
}

const DOC_TYPE_LABELS: Record<string, string> = {
  receipt: 'Receipt',
  inspection: 'Inspection',
  lease: 'Lease',
  other: 'Document',
}

export default function BookingDetailPage({ params }: Props) {
  const booking = getBookingById(params.id)
  if (!booking) notFound()

  const currentStep = getStepFromStatus(booking.status)
  const completedTours = booking.tours.filter((t) => t.status === 'completed')
  const upcomingTours = booking.tours.filter((t) => t.status === 'scheduled')

  return (
    <div className="min-h-screen bg-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Dashboard', href: '/student/dashboard' },
            { label: 'Booking Detail' },
          ]}
          className="mb-6"
        />

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">{booking.packageName}</h1>
            <p className="text-sm text-text-secondary">
              Booked {formatDate(booking.createdAt)}
            </p>
          </div>
          <StatusBadge status={booking.status} className="mt-1 shrink-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status timeline */}
            <div className="card-surface p-6">
              <h2 className="text-base font-bold text-text-primary mb-5">Booking Progress</h2>
              <StepperNav
                steps={BOOKING_STEPS}
                currentStep={currentStep}
                variant="vertical"
              />
            </div>

            {/* Upcoming tours */}
            {upcomingTours.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-text-primary mb-3">Upcoming Tours</h2>
                <div className="space-y-3">
                  {upcomingTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </section>
            )}

            {/* Completed tours */}
            {completedTours.length > 0 && (
              <section>
                <h2 className="text-base font-bold text-text-primary mb-3">Completed Tours</h2>
                <div className="space-y-3">
                  {completedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </section>
            )}

            {/* Documents */}
            <section>
              <h2 className="text-base font-bold text-text-primary mb-3">Documents</h2>
              {booking.documents.length === 0 ? (
                <div className="card-surface p-8 text-center">
                  <FileText size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">No documents yet. Your coordinator will upload files here.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {booking.documents.map((doc) => {
                    return (
                      <div key={doc.id} className="card-surface p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                          <FileText size={18} className="text-brand-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-text-primary">{doc.name}</div>
                          <div className="text-xs text-text-muted capitalize">
                            {doc.type} · Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-brand transition-colors px-3 py-1.5 rounded-lg hover:bg-bg-subtle border border-border-default">
                          <Download size={12} />
                          Download
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Notes */}
            {booking.notes && (
              <section>
                <h2 className="text-base font-bold text-text-primary mb-3">Booking Notes</h2>
                <div className="card-surface p-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{booking.notes}</p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Order summary */}
            <div className="card-surface p-5">
              <h3 className="text-sm font-bold text-text-primary mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">{booking.packageName}</span>
                  <span className="font-medium text-text-primary">${booking.packagePrice}</span>
                </div>
                {booking.addOns.map((a) => (
                  <div key={a.id} className="flex justify-between">
                    <span className="text-text-muted">{a.name}</span>
                    <span className="font-medium text-text-primary">+${a.price}</span>
                  </div>
                ))}
                {booking.groupDiscount > 0 && (
                  <div className="flex justify-between text-brand-700 font-medium">
                    <span>Group discount ({booking.groupDiscount}%)</span>
                    <span>-${Math.round(booking.packagePrice * booking.groupDiscount / 100)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-border-default font-bold">
                  <span className="text-text-primary">Total</span>
                  <span className="text-text-primary">${booking.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Coordinator */}
            <div className="card-surface p-5">
              <h3 className="text-sm font-bold text-text-primary mb-3">Your Coordinator</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-sm">
                  {booking.coordinatorName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-text-primary text-sm">{booking.coordinatorName}</div>
                  <div className="text-xs text-text-muted">NestVT Coordinator</div>
                </div>
              </div>
              <a
                href={`mailto:${booking.coordinatorEmail}`}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-brand transition-colors mb-2"
              >
                <Mail size={14} />
                {booking.coordinatorEmail}
              </a>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Phone size={14} />
                (802) 555-0100
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/student/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-brand transition-colors px-3 py-2 rounded-lg hover:bg-bg-subtle"
            >
              <ArrowLeft size={14} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
