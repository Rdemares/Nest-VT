import Link from 'next/link'
import { Building2, Eye, Calendar, TrendingUp, Plus, ArrowRight, Star } from 'lucide-react'
import StatusBadge from '@/components/StatusBadge'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { DEMO_LANDLORD, LANDLORD_LISTINGS, BOOKINGS, PROPERTIES } from '@/lib/mock-data'

export default function LandlordDashboardPage() {
  const listings = LANDLORD_LISTINGS.filter((l) => l.landlordId === DEMO_LANDLORD.id)
  const totalViews = listings.reduce((s, l) => s + l.views, 0)
  const totalTourRequests = listings.reduce((s, l) => s + l.tourRequests, 0)
  const liveListings = listings.filter((l) => l.status === 'live').length

  // Find tour requests from bookings
  const tourRequests = BOOKINGS.flatMap((b) =>
    b.tours.map((t) => ({
      ...t,
      studentPackage: b.packageName,
      bookingId: b.id,
    }))
  ).filter((t) => t.status === 'scheduled').slice(0, 5)

  return (
    <div className="min-h-screen bg-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BreadcrumbNav crumbs={[{ label: 'Landlord Dashboard' }]} className="mb-6" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
              Welcome, {DEMO_LANDLORD.name}
            </h1>
            <p className="text-text-secondary text-sm">{DEMO_LANDLORD.email}</p>
          </div>
          <Link href="/for-landlords/submit" className="btn-brand px-4 py-2.5 rounded-xl text-sm font-semibold shrink-0">
            <Plus size={16} />
            Add Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Live Listings', value: liveListings, icon: Building2, color: 'text-brand-700 bg-brand-50' },
            { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-blue-700 bg-blue-50' },
            { label: 'Tour Requests', value: totalTourRequests, icon: Calendar, color: 'text-purple-700 bg-purple-50' },
            { label: 'Avg. Rating', value: '4.5', icon: Star, color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card-surface p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon size={18} />
              </div>
              <div className="text-2xl font-extrabold text-text-primary mb-0.5">{value}</div>
              <div className="text-xs text-text-muted font-medium">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Listings table */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-text-primary">My Listings</h2>
                <Link href="/for-landlords/submit" className="text-sm text-text-brand font-medium hover:underline flex items-center gap-1">
                  Add new <Plus size={14} />
                </Link>
              </div>

              <div className="card-surface overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-default bg-bg-subtle">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Property</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Views</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Tours</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:table-cell">Listed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-default">
                      {listings.map((listing) => {
                        const property = PROPERTIES.find((p) => p.id === listing.propertyId)
                        return (
                          <tr key={listing.id} className="hover:bg-bg-subtle transition-colors">
                            <td className="py-3.5 px-4">
                              <div>
                                <div className="font-medium text-text-primary text-sm">{listing.title}</div>
                                {property && (
                                  <div className="text-xs text-text-muted mt-0.5">
                                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)} · ${property.price.toLocaleString()}/mo
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusBadge status={listing.status} />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className="font-medium text-text-primary">{listing.views}</span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className={`font-medium ${listing.tourRequests > 0 ? 'text-brand-700' : 'text-text-muted'}`}>
                                {listing.tourRequests}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                              <span className="text-text-muted text-xs">
                                {new Date(listing.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Tour requests */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-text-primary">Upcoming Tour Requests</h2>
                <span className="text-sm text-text-muted">{tourRequests.length} pending</span>
              </div>

              {tourRequests.length === 0 ? (
                <div className="card-surface p-8 text-center">
                  <Calendar size={28} className="text-text-muted mx-auto mb-2" />
                  <p className="text-sm text-text-muted">No upcoming tours yet. Students will book through their coordinator.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tourRequests.map((tour) => (
                    <div key={tour.id} className="card-surface p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-text-primary text-sm">{tour.propertyAddress}</div>
                        <div className="text-xs text-text-muted mt-0.5">
                          {new Date(tour.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          {' at '}{tour.time}
                          {' · '}{tour.studentPackage}
                        </div>
                      </div>
                      <StatusBadge status={tour.status} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Performance chart placeholder */}
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-brand-700" />
                <h3 className="text-sm font-bold text-text-primary">Listing Performance</h3>
              </div>

              <div className="space-y-3">
                {listings.map((listing) => (
                  <div key={listing.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-secondary truncate max-w-[60%]">{listing.title.split('—')[0].trim()}</span>
                      <span className="font-semibold text-text-primary">{listing.views} views</span>
                    </div>
                    <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-700 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (listing.views / 250) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card-surface p-5">
              <h3 className="text-sm font-bold text-text-primary mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { href: '/for-landlords/submit', label: 'Submit New Listing', icon: Plus },
                  { href: '/for-landlords', label: 'Why NestVT?', icon: Building2 },
                  { href: '/listings', label: 'Browse Student View', icon: Eye },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-bg-subtle transition-colors text-sm text-text-secondary hover:text-text-brand group"
                  >
                    <Icon size={15} className="text-text-muted group-hover:text-brand-700 transition-colors" />
                    {label}
                    <ArrowRight size={12} className="ml-auto text-text-muted group-hover:text-text-brand transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-brand-900 mb-1.5">Pro Tip</h4>
              <p className="text-xs text-brand-800 leading-relaxed">
                Listings with 4+ photos and detailed descriptions receive 3x more tour requests. Update your listing photos regularly for best results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
