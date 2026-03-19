'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Info } from 'lucide-react'
import PackageCard from '@/components/PackageCard'
import AddOnToggle from '@/components/AddOnToggle'
import GroupWidget from '@/components/GroupWidget'
import OrderSummary from '@/components/OrderSummary'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { PACKAGES, ADD_ONS } from '@/lib/mock-data'
import type { Package, AddOn } from '@/lib/mock-data'

export default function PackagesPage() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-premium')
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([])
  const [groupSize, setGroupSize] = useState(1)
  const [groupEmails, setGroupEmails] = useState<string[]>([])

  const selectedPackage = PACKAGES.find((p) => p.id === selectedPackageId) ?? null
  const selectedAddOns = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id))

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="bg-bg-subtle border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNav crumbs={[{ label: 'Packages' }]} className="mb-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Choose your package</h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Expert housing support tailored to UVM students. No hidden fees, no contracts — just confidence in your next home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package cards */}
            <section>
              <h2 className="text-lg font-bold text-text-primary mb-4">1. Select a package</h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                role="radiogroup"
                aria-label="Select package"
              >
                {PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    selected={selectedPackageId === pkg.id}
                    onSelect={setSelectedPackageId}
                  />
                ))}
              </div>
            </section>

            {/* Add-ons */}
            <section>
              <h2 className="text-lg font-bold text-text-primary mb-1">2. Add extras (optional)</h2>
              <p className="text-sm text-text-muted mb-4">Enhance your package with these optional services.</p>
              <div className="space-y-3">
                {ADD_ONS.map((addOn) => (
                  <AddOnToggle
                    key={addOn.id}
                    addOn={addOn}
                    checked={selectedAddOnIds.includes(addOn.id)}
                    onToggle={toggleAddOn}
                  />
                ))}
              </div>
            </section>

            {/* Group booking */}
            <section>
              <h2 className="text-lg font-bold text-text-primary mb-1">3. Group booking</h2>
              <p className="text-sm text-text-muted mb-4">Booking with roommates? Unlock group discounts (applied to package price).</p>
              <GroupWidget
                groupSize={groupSize}
                onGroupSizeChange={setGroupSize}
                emails={groupEmails}
                onEmailsChange={setGroupEmails}
                packagePrice={selectedPackage?.price ?? 0}
              />
            </section>

            {/* FAQ */}
            <section className="card-surface p-6">
              <h2 className="text-lg font-bold text-text-primary mb-4">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'When do I pay?',
                    a: 'No payment is processed online. After you submit your booking, a coordinator contacts you within 24 hours to confirm details and collect payment via your preferred method.'
                  },
                  {
                    q: 'How does the lease review work?',
                    a: 'We work with licensed Vermont attorneys who review your lease draft and provide a written summary of key terms, red flags, and recommended negotiation points.'
                  },
                  {
                    q: 'Can I upgrade from Base to Premium later?',
                    a: 'Yes — contact your coordinator at any time to upgrade. You pay the price difference and any additional services begin immediately.'
                  },
                  {
                    q: 'How does group discount work?',
                    a: 'Group discounts apply to the package price only (not add-ons). Enable group booking above and enter your group size to see the discount applied automatically.'
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <div className="flex items-start gap-2 mb-1">
                      <Info size={15} className="text-brand-700 mt-0.5 shrink-0" />
                      <h3 className="text-sm font-semibold text-text-primary">{q}</h3>
                    </div>
                    <p className="text-sm text-text-secondary pl-5 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <OrderSummary
                selectedPackage={selectedPackage}
                selectedAddOns={selectedAddOns}
                groupSize={groupSize}
                showButton={false}
              />
              <Link
                href={selectedPackage ? `/packages/checkout?pkg=${selectedPackageId}&addons=${selectedAddOnIds.join(',')}&group=${groupSize}` : '/packages/checkout'}
                className={`btn-brand w-full py-3.5 rounded-xl text-sm font-semibold justify-center ${!selectedPackage ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Continue to Checkout
                <ArrowRight size={16} />
              </Link>
              <p className="text-xs text-text-muted text-center">
                No payment required now. Coordinator contacts you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
