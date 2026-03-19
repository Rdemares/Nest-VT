import Link from 'next/link'
import { ArrowRight, Calendar, FileText, Search, Star, Clock, CheckCircle2 } from 'lucide-react'
import TourCard from '@/components/TourCard'
import StatusBadge from '@/components/StatusBadge'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { DEMO_STUDENT, getBookingsForStudent, PROPERTIES } from '@/lib/mock-data'

export default function StudentDashboardPage() {
  const bookings = getBookingsForStudent(DEMO_STUDENT.id)
  const activeBooking = bookings.find((b) => b.status === 'in_progress') ?? bookings[0]

  // Gather all upcoming tours
  const upcomingTours = bookings
    .flatMap((b) => b.tours)
    .filter((t) => t.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const QUICK_ACTIONS = [
    { href: '/listings', label: 'Browse Listings', icon: Search, desc: 'Explore verified Burlington rentals' },
    { href: '/packages', label: 'View Packages', icon: Star, desc: 'See Base & Premium options' },
    { href: '/packages/checkout', label: 'Book a Package', icon: Calendar, desc: 'Start your housing search' },
  ]

  return (
    <div className="min-h-screen bg-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav crumbs={[{ label: 'Dashboard' }]} className="mb-6" />

        {/* Welcome banner */}
        <div className="hero-mesh rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="relative">
            <p className="text-brand-300 text-sm font-medium mb-1">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{DEMO_STUDENT.name}</h1>
            <p className="text-brand-200 text-sm mb-5">
              {DEMO_STUDENT.university} · Class of {DEMO_STUDENT.graduationYear}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/listings" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20">
                <Search size={14} />
                Browse Listings
              </Link>
              <Link href="/packages/checkout" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-brand-900 text-sm font-semibold hover:bg-brand-50 transition-colors">
                Book a Package
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active booking */}
            {activeBooking && (
              <section>
                <h2 className="text-base font-bold text-text-primary mb-3">Active Booking</h2>
                <div className="card-surface p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-text-primary">{activeBooking.packageName}</h3>
                      <p className="text-sm text-text-secondary mt-0.5">
                        Coordinator: <span className="font-medium">{activeBooking.coordinatorName}</span>
                      </p>
                    </div>
                    <StatusBadge status={activeBooking.status} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: 'Total paid', value: `$${activeBooking.totalPrice}` },
                      { label: 'Tours', value: `${activeBooking.tours.length} scheduled` },
                      { label: 'Documents', value: `${activeBooking.documents.length} files` },
                      { label: 'Group size', value: `${activeBooking.groupSize} student${activeBooking.groupSize > 1 ? 's' : ''}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-bg-subtle rounded-lg p-3">
                        <div className="text-xs text-text-muted mb-0.5">{label}</div>
                        <div className="text-sm font-semibold text-text-primary">{value}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/student/bookings/${activeBooking.id}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline"
                  >
                    View full booking details
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </section>
            )}

            {/* All bookings */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-text-primary">All Bookings</h2>
                <span className="text-sm text-text-muted">{bookings.length} total</span>
              </div>
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/student/bookings/${booking.id}`}
                    className="card-surface p-4 flex items-center justify-between gap-3 hover:border-border-brand transition-colors group block"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-text-primary text-sm group-hover:text-text-brand transition-colors">
                        {booking.packageName}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        {' · '}${booking.totalPrice}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={booking.status} />
                      <ArrowRight size={14} className="text-text-muted group-hover:text-text-brand transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Upcoming tours */}
            {upcomingTours.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={15} className="text-brand-700" />
                  <h2 className="text-base font-bold text-text-primary">Upcoming Tours</h2>
                </div>
                <div className="space-y-3">
                  {upcomingTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <section>
              <h2 className="text-base font-bold text-text-primary mb-3">Quick Actions</h2>
              <div className="space-y-2.5">
                {QUICK_ACTIONS.map(({ href, label, icon: Icon, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="card-surface p-4 flex items-center gap-3 hover:border-border-brand transition-colors group block"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                      <Icon size={16} className="text-brand-800" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text-primary group-hover:text-text-brand transition-colors">{label}</div>
                      <div className="text-xs text-text-muted">{desc}</div>
                    </div>
                    <ArrowRight size={14} className="text-text-muted ml-auto shrink-0 group-hover:text-text-brand transition-colors" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Recent documents */}
            <section>
              <h2 className="text-base font-bold text-text-primary mb-3">Recent Documents</h2>
              <div className="space-y-2">
                {bookings.flatMap((b) => b.documents).slice(0, 4).map((doc) => (
                  <div key={doc.id} className="card-surface p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                      <FileText size={14} className="text-brand-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-text-primary truncate">{doc.name}</div>
                      <div className="text-xs text-text-muted capitalize">{doc.type}</div>
                    </div>
                    <CheckCircle2 size={14} className="text-brand-600 shrink-0" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
