import { Tag, Users } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Package, AddOn } from '@/lib/mock-data'
import { getGroupDiscountPercent } from '@/lib/mock-data'

interface OrderSummaryProps {
  selectedPackage: Package | null
  selectedAddOns: AddOn[]
  groupSize: number
  className?: string
  onCheckout?: () => void
  showButton?: boolean
}

export default function OrderSummary({
  selectedPackage,
  selectedAddOns,
  groupSize,
  className,
  onCheckout,
  showButton = true,
}: OrderSummaryProps) {
  const packagePrice = selectedPackage?.price ?? 0
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  const subtotal = packagePrice + addOnsTotal
  const discountPct = getGroupDiscountPercent(groupSize)
  const discountAmount = Math.round((packagePrice * discountPct) / 100)
  const total = subtotal - discountAmount

  return (
    <div className={cn('card-surface p-5', className)}>
      <h3 className="font-semibold text-text-primary text-base mb-4">Order Summary</h3>

      {/* Line items */}
      <div className="space-y-2.5 mb-4">
        {selectedPackage ? (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">{selectedPackage.name}</span>
            <span className="font-medium text-text-primary">${packagePrice}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted italic">No package selected</span>
            <span className="text-text-muted">—</span>
          </div>
        )}

        {selectedAddOns.map((addOn) => (
          <div key={addOn.id} className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">{addOn.name}</span>
            <span className="font-medium text-text-primary">+${addOn.price}</span>
          </div>
        ))}
      </div>

      {/* Discount */}
      {discountPct > 0 && (
        <div className="flex items-center justify-between text-sm py-2.5 px-3 rounded-lg bg-brand-50 border border-brand-200 mb-4">
          <span className="flex items-center gap-1.5 text-brand-800 font-medium">
            <Tag size={13} />
            Group discount ({discountPct}% off package)
          </span>
          <span className="font-bold text-brand-800">-${discountAmount}</span>
        </div>
      )}

      {/* Divider */}
      <div className="section-divider mb-4" />

      {/* Total */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-text-primary">Total</span>
        <span className="text-2xl font-extrabold text-text-primary">
          ${total > 0 ? total.toLocaleString() : '—'}
        </span>
      </div>

      {groupSize > 1 && (
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
          <Users size={12} />
          <span>Split with {groupSize} students: ${Math.round(total / groupSize)}/person</span>
        </div>
      )}

      <p className="text-xs text-text-muted mb-4">
        No payment processed now. A coordinator will contact you within 24 hours to confirm your booking.
      </p>

      {showButton && (
        <button
          onClick={onCheckout}
          disabled={!selectedPackage}
          className={cn(
            'w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200',
            selectedPackage
              ? 'btn-brand'
              : 'bg-bg-subtle text-text-muted cursor-not-allowed'
          )}
        >
          {selectedPackage ? 'Confirm Booking' : 'Select a Package to Continue'}
        </button>
      )}
    </div>
  )
}
