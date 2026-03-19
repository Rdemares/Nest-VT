'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, ArrowRight, Building2, Camera, DollarSign, User } from 'lucide-react'
import StepperNav from '@/components/StepperNav'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import { cn } from '@/lib/cn'

const STEPS = [
  { id: 1, label: 'Property Details', description: 'Address, type, size' },
  { id: 2, label: 'Photos & Description', description: 'Images and details' },
  { id: 3, label: 'Pricing & Availability', description: 'Rent and dates' },
  { id: 4, label: 'Contact Info', description: 'Your information' },
]

const AMENITY_OPTIONS = [
  'High-speed WiFi', 'In-unit laundry', 'Washer/Dryer hookups',
  'Dishwasher', 'Central AC', 'Heat included',
  'Utilities included', 'Off-street parking', 'Street parking',
  'Garage', 'Basement storage', 'Backyard/Patio',
  'Hardwood floors', 'Pets allowed', 'Furnished option',
  'Bike storage', 'Elevator', 'Gym access',
]

const NEIGHBORHOODS = [
  'Hill Section', 'South End', 'Old North End',
  'Downtown', 'New North End', 'East Side',
]

interface FormState {
  // Step 1
  address: string
  neighborhood: string
  zip: string
  type: string
  bedrooms: string
  bathrooms: string
  // Step 2
  description: string
  amenities: string[]
  imageUrls: string
  // Step 3
  price: string
  availableFrom: string
  leaseTerm: string
  petsAllowed: string
  utilitiesIncluded: string
  parkingIncluded: string
  laundry: string
  // Step 4
  landlordName: string
  landlordEmail: string
  landlordPhone: string
  company: string
}

const INITIAL_FORM: FormState = {
  address: '', neighborhood: '', zip: '', type: '', bedrooms: '', bathrooms: '',
  description: '', amenities: [], imageUrls: '',
  price: '', availableFrom: '', leaseTerm: '12', petsAllowed: 'false',
  utilitiesIncluded: 'false', parkingIncluded: 'false', laundry: 'in_building',
  landlordName: '', landlordEmail: '', landlordPhone: '', company: '',
}

export default function SubmitListingPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field: keyof FormState, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    const next = form.amenities.includes(amenity)
      ? form.amenities.filter((a) => a !== amenity)
      : [...form.amenities, amenity]
    update('amenities', next)
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
  }
  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-brand-700" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">Listing Submitted!</h1>
          <p className="text-text-secondary leading-relaxed mb-6">
            Thank you for submitting your property to NestVT. Our team will review your listing within 48 hours and contact you at <strong>{form.landlordEmail}</strong> to confirm publication.
          </p>
          <div className="card-surface p-5 text-left mb-8">
            <h3 className="text-sm font-semibold mb-3">What happens next?</h3>
            <div className="space-y-2.5">
              {[
                'Our team verifies property details and photos',
                'Your listing goes live to UVM students within 48 hours',
                'Students book tours through their NestVT coordinator',
                'You receive confirmed tour appointments via email',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-900 text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">{i + 1}</div>
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/landlord/dashboard" className="btn-brand px-6 py-3 rounded-xl text-sm font-semibold">
              Go to Dashboard
            </Link>
            <Link href="/for-landlords" className="btn-brand btn-outline px-6 py-3 rounded-xl text-sm font-semibold">
              Back to Landlords
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="bg-bg-subtle border-b border-border-default">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNav
            crumbs={[
              { label: 'For Landlords', href: '/for-landlords' },
              { label: 'Submit Listing' },
            ]}
            className="mb-3"
          />
          <h1 className="text-2xl font-bold text-text-primary mb-4">Submit Your Property</h1>
          <StepperNav steps={STEPS} currentStep={step} variant="horizontal" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1 — Property Details */}
        {step === 0 && (
          <div className="card-surface p-6 animate-fade-in space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={18} className="text-brand-700" />
              <h2 className="text-lg font-bold text-text-primary">Property Details</h2>
            </div>

            <div>
              <label className="label-base" htmlFor="address">Street address *</label>
              <input id="address" type="text" value={form.address} onChange={(e) => update('address', e.target.value)}
                className="input-base" placeholder="123 Maple Street" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base" htmlFor="neighborhood">Neighborhood *</label>
                <select id="neighborhood" value={form.neighborhood} onChange={(e) => update('neighborhood', e.target.value)} className="input-base" required>
                  <option value="">Select neighborhood</option>
                  {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="zip">ZIP code *</label>
                <input id="zip" type="text" value={form.zip} onChange={(e) => update('zip', e.target.value)}
                  className="input-base" placeholder="05401" maxLength={5} required />
              </div>
            </div>

            <div>
              <label className="label-base" htmlFor="type">Property type *</label>
              <select id="type" value={form.type} onChange={(e) => update('type', e.target.value)} className="input-base" required>
                <option value="">Select type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="condo">Condo</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-base" htmlFor="bedrooms">Bedrooms *</label>
                <select id="bedrooms" value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className="input-base" required>
                  <option value="">Select</option>
                  <option value="0">Studio</option>
                  <option value="1">1 bedroom</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4 bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="bathrooms">Bathrooms *</label>
                <select id="bathrooms" value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className="input-base" required>
                  <option value="">Select</option>
                  <option value="1">1 bathroom</option>
                  <option value="1.5">1.5 bathrooms</option>
                  <option value="2">2 bathrooms</option>
                  <option value="2.5">2.5 bathrooms</option>
                  <option value="3">3+ bathrooms</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Photos & Description */}
        {step === 1 && (
          <div className="card-surface p-6 animate-fade-in space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Camera size={18} className="text-brand-700" />
              <h2 className="text-lg font-bold text-text-primary">Photos & Description</h2>
            </div>

            <div>
              <label className="label-base" htmlFor="description">Property description *</label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                className="input-base min-h-[120px] resize-y"
                placeholder="Describe the property, its features, and what makes it great for UVM students..."
                required
              />
            </div>

            <div>
              <label className="label-base" htmlFor="imageUrls">
                Photo URLs <span className="text-text-muted font-normal">(one per line)</span>
              </label>
              <textarea
                id="imageUrls"
                value={form.imageUrls}
                onChange={(e) => update('imageUrls', e.target.value)}
                className="input-base min-h-[80px] resize-y font-mono text-xs"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-xs text-text-muted mt-1.5">
                Enter publicly accessible image URLs. We recommend Unsplash for testing.
              </p>
            </div>

            <div>
              <label className="label-base">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {AMENITY_OPTIONS.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs text-left transition-all',
                      form.amenities.includes(amenity)
                        ? 'border-brand-700 bg-brand-50 text-brand-800 font-medium'
                        : 'border-border-default text-text-secondary hover:border-border-brand'
                    )}
                  >
                    {form.amenities.includes(amenity) && (
                      <CheckCircle2 size={11} className="text-brand-700 shrink-0" />
                    )}
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Pricing & Availability */}
        {step === 2 && (
          <div className="card-surface p-6 animate-fade-in space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-brand-700" />
              <h2 className="text-lg font-bold text-text-primary">Pricing & Availability</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base" htmlFor="price">Monthly rent ($) *</label>
                <input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                  className="input-base"
                  placeholder="1850"
                  min="500"
                  required
                />
              </div>
              <div>
                <label className="label-base" htmlFor="leaseTerm">Lease term (months)</label>
                <select id="leaseTerm" value={form.leaseTerm} onChange={(e) => update('leaseTerm', e.target.value)} className="input-base">
                  <option value="9">9 months (academic year)</option>
                  <option value="12">12 months</option>
                  <option value="6">6 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label-base" htmlFor="availableFrom">Available from *</label>
              <input id="availableFrom" type="date" value={form.availableFrom} onChange={(e) => update('availableFrom', e.target.value)} className="input-base" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base" htmlFor="utilitiesIncluded">Utilities included?</label>
                <select id="utilitiesIncluded" value={form.utilitiesIncluded} onChange={(e) => update('utilitiesIncluded', e.target.value)} className="input-base">
                  <option value="false">No</option>
                  <option value="true">Yes — all utilities</option>
                  <option value="partial">Partial (heat/hot water)</option>
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="parkingIncluded">Parking included?</label>
                <select id="parkingIncluded" value={form.parkingIncluded} onChange={(e) => update('parkingIncluded', e.target.value)} className="input-base">
                  <option value="false">No</option>
                  <option value="true">Yes — off-street</option>
                  <option value="garage">Yes — garage</option>
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="laundry">Laundry</label>
                <select id="laundry" value={form.laundry} onChange={(e) => update('laundry', e.target.value)} className="input-base">
                  <option value="in_unit">In-unit</option>
                  <option value="in_building">In building (shared)</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="label-base" htmlFor="petsAllowed">Pets allowed?</label>
                <select id="petsAllowed" value={form.petsAllowed} onChange={(e) => update('petsAllowed', e.target.value)} className="input-base">
                  <option value="false">No pets</option>
                  <option value="true">Yes — all pets</option>
                  <option value="cats">Cats only</option>
                  <option value="small">Small dogs only</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Contact Info */}
        {step === 3 && (
          <div className="card-surface p-6 animate-fade-in space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-brand-700" />
              <h2 className="text-lg font-bold text-text-primary">Your Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base" htmlFor="landlordName">Full name *</label>
                <input id="landlordName" type="text" value={form.landlordName} onChange={(e) => update('landlordName', e.target.value)}
                  className="input-base" placeholder="Sarah Mitchell" required />
              </div>
              <div>
                <label className="label-base" htmlFor="company">Company / LLC <span className="text-text-muted font-normal">(optional)</span></label>
                <input id="company" type="text" value={form.company} onChange={(e) => update('company', e.target.value)}
                  className="input-base" placeholder="Burlington Properties LLC" />
              </div>
              <div>
                <label className="label-base" htmlFor="landlordEmail">Email address *</label>
                <input id="landlordEmail" type="email" value={form.landlordEmail} onChange={(e) => update('landlordEmail', e.target.value)}
                  className="input-base" placeholder="sarah@burlingtonprops.com" required />
              </div>
              <div>
                <label className="label-base" htmlFor="landlordPhone">Phone number *</label>
                <input id="landlordPhone" type="tel" value={form.landlordPhone} onChange={(e) => update('landlordPhone', e.target.value)}
                  className="input-base" placeholder="(802) 555-0100" required />
              </div>
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-sm text-brand-800">
              <strong>What happens after you submit?</strong> Our team reviews your listing within 48 hours and contacts you to confirm details before going live. Listing on NestVT is completely free for landlords.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={step === 0 ? undefined : handleBack}
            disabled={step === 0}
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium transition-colors',
              step === 0
                ? 'text-text-muted cursor-not-allowed'
                : 'text-text-secondary hover:text-text-brand'
            )}
          >
            <ArrowLeft size={15} />
            {step === 0 ? (
              <Link href="/for-landlords" className="text-text-secondary hover:text-text-brand">Back to overview</Link>
            ) : 'Previous'}
          </button>

          {step < STEPS.length - 1 ? (
            <button onClick={handleNext} className="btn-brand px-6 py-2.5 rounded-xl text-sm font-semibold">
              Next: {STEPS[step + 1].label}
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-brand px-6 py-2.5 rounded-xl text-sm font-semibold min-w-[160px] justify-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </span>
              ) : (
                <>Submit Listing <CheckCircle2 size={15} /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
