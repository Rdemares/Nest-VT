'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, User, Mail, Phone, MessageSquare, Leaf } from 'lucide-react'
import OrderSummary from '@/components/OrderSummary'
import GroupWidget from '@/components/GroupWidget'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { PACKAGES, ADD_ONS, DEMO_STUDENT, getGroupDiscountPercent } from '@/lib/mock-data'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const pkgId = searchParams.get('pkg') ?? 'pkg-premium'
  const addonIds = searchParams.get('addons')?.split(',').filter(Boolean) ?? []
  const initialGroup = Number(searchParams.get('group') ?? '1')

  const initialPackage = PACKAGES.find((p) => p.id === pkgId) ?? PACKAGES[1]
  const initialAddOns = ADD_ONS.filter((a) => addonIds.includes(a.id))

  const [form, setForm] = useState({
    firstName: DEMO_STUDENT.name.split(' ')[0],
    lastName: DEMO_STUDENT.name.split(' ')[1] ?? '',
    email: DEMO_STUDENT.email,
    phone: DEMO_STUDENT.phone ?? '',
    graduationYear: String(DEMO_STUDENT.graduationYear ?? ''),
    notes: '',
    preferences: '',
  })
  const [groupSize, setGroupSize] = useState(initialGroup)
  const [groupEmails, setGroupEmails] = useState<string[]>(initialGroup > 1 ? Array(initialGroup - 1).fill('') : [])
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const discountPct = getGroupDiscountPercent(groupSize)
  const discountAmount = Math.round((initialPackage.price * discountPct) / 100)
  const addOnsTotal = initialAddOns.reduce((s, a) => s + a.price, 0)
  const total = initialPackage.price + addOnsTotal - discountAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-brand-700" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-sm font-medium mb-4">
            <Leaf size={13} />
            Booking confirmed!
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">You&apos;re all set, {form.firstName}!</h1>
          <p className="text-text-secondary leading-relaxed mb-2">
            Your <strong>{initialPackage.name}</strong> booking has been received.
          </p>
          <p className="text-text-secondary leading-relaxed mb-6">
            A NestVT coordinator will contact you at <strong>{form.email}</strong> within 24 hours to confirm your booking and schedule next steps.
          </p>

          {/* Booking summary */}
          <div className="card-surface p-5 text-left mb-8">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Package</span>
                <span className="font-medium text-text-primary">{initialPackage.name}</span>
              </div>
              {initialAddOns.map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span className="text-text-muted">{a.name}</span>
                  <span className="font-medium text-text-primary">+${a.price}</span>
                </div>
              ))}
              {discountPct > 0 && (
                <div className="flex justify-between text-brand-700 font-medium">
                  <span>Group discount ({discountPct}%)</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-border-default font-bold">
                <span className="text-text-primary">Total</span>
                <span className="text-text-primary">${total}</span>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-3 pt-3 border-t border-border-default">
              No payment was charged. Your coordinator will arrange payment within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/student/dashboard" className="btn-brand px-6 py-3 rounded-xl text-sm font-semibold">
              Go to Dashboard
            </Link>
            <Link href="/listings" className="btn-brand btn-outline px-6 py-3 rounded-xl text-sm font-semibold">
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="bg-bg-subtle border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav
            crumbs={[
              { label: 'Packages', href: '/packages' },
              { label: 'Checkout' },
            ]}
            className="mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">Complete Your Booking</h1>
          <p className="text-text-secondary text-sm">
            No payment now — a coordinator will contact you within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="card-surface p-6">
              <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <User size={16} className="text-brand-700" />
                Your Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-base" htmlFor="firstName">First name *</label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => updateForm('firstName', e.target.value)}
                    className="input-base"
                    placeholder="Alex"
                  />
                </div>
                <div>
                  <label className="label-base" htmlFor="lastName">Last name *</label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => updateForm('lastName', e.target.value)}
                    className="input-base"
                    placeholder="Thompson"
                  />
                </div>
                <div>
                  <label className="label-base" htmlFor="email">
                    <span className="flex items-center gap-1.5"><Mail size={13} /> Email address *</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    className="input-base"
                    placeholder="alex@uvm.edu"
                  />
                </div>
                <div>
                  <label className="label-base" htmlFor="phone">
                    <span className="flex items-center gap-1.5"><Phone size={13} /> Phone number</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    className="input-base"
                    placeholder="(802) 555-0100"
                  />
                </div>
                <div>
                  <label className="label-base" htmlFor="gradYear">Graduation year</label>
                  <select
                    id="gradYear"
                    value={form.graduationYear}
                    onChange={(e) => updateForm('graduationYear', e.target.value)}
                    className="input-base"
                  >
                    <option value="">Select year</option>
                    {[2025, 2026, 2027, 2028, 2029].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                    <option value="grad">Graduate student</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="card-surface p-6">
              <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-brand-700" />
                Housing Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="label-base" htmlFor="preferences">What are you looking for?</label>
                  <textarea
                    id="preferences"
                    value={form.preferences}
                    onChange={(e) => updateForm('preferences', e.target.value)}
                    className="input-base min-h-[80px] resize-y"
                    placeholder="e.g. 2-bedroom in Hill Section, under $1,000/person, available August 1..."
                  />
                </div>
                <div>
                  <label className="label-base" htmlFor="notes">Additional notes</label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => updateForm('notes', e.target.value)}
                    className="input-base min-h-[64px] resize-y"
                    placeholder="Anything else your coordinator should know..."
                  />
                </div>
              </div>
            </div>

            {/* Group booking */}
            <GroupWidget
              groupSize={groupSize}
              onGroupSizeChange={setGroupSize}
              emails={groupEmails}
              onEmailsChange={setGroupEmails}
              packagePrice={initialPackage.price}
            />

            {/* Submit */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/packages"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-brand transition-colors font-medium"
              >
                <ArrowLeft size={15} />
                Back to packages
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-brand px-8 py-3 rounded-xl text-sm font-semibold min-w-[180px] justify-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Confirming…
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                selectedPackage={initialPackage}
                selectedAddOns={initialAddOns}
                groupSize={groupSize}
                showButton={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
