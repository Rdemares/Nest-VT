import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Star, Shield, Search, Users, ArrowRight, CheckCircle2, MapPin, Building2, Quote } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import InterestForm from '@/components/InterestForm'
import { getFeaturedProperties, REVIEWS, PACKAGES } from '@/lib/mock-data'

const TESTIMONIALS = REVIEWS.filter((r) => r.verified && r.rating >= 4).slice(0, 3)

export default function HomePage() {
  const featured = getFeaturedProperties()

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/60 border border-brand-700/50 text-brand-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Leaf size={13} className="text-brand-300" />
              Trusted by UVM students since 2024
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance">
              Find your perfect{' '}
              <span className="text-brand-300">Burlington</span>{' '}
              apartment
            </h1>

            <p className="text-lg sm:text-xl text-brand-200 leading-relaxed mb-8 max-w-2xl">
              NestVT connects UVM students with verified off-campus housing. We handle the tours, lease review, and all the stress — so you can focus on school.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/listings" className="btn-brand px-6 py-3.5 text-base rounded-xl">
                Browse Listings
                <ArrowRight size={18} />
              </Link>
              <Link href="/packages" className="btn-brand btn-outline px-6 py-3.5 text-base rounded-xl border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                See Packages
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-brand-800/50">
              <div>
                <div className="text-2xl font-extrabold text-white">200+</div>
                <div className="text-sm text-brand-300">Verified listings</div>
              </div>
              <div className="w-px h-10 bg-brand-800/60" />
              <div>
                <div className="text-2xl font-extrabold text-white">98%</div>
                <div className="text-sm text-brand-300">Student satisfaction</div>
              </div>
              <div className="w-px h-10 bg-brand-800/60" />
              <div>
                <div className="text-2xl font-extrabold text-white">$349</div>
                <div className="text-sm text-brand-300">Full-service from</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1440 20 1080 0 720 0C360 0 0 20 0 20L0 60Z" fill="var(--color-bg-base)" />
          </svg>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">How NestVT works</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Three simple steps to your next home near UVM</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                step: '01',
                title: 'Browse verified listings',
                desc: 'Explore curated apartments in Hill Section, South End, Downtown, and across Burlington — all verified by our team.',
              },
              {
                icon: Shield,
                step: '02',
                title: 'Choose your package',
                desc: 'Select Base or Premium. We schedule tours, review your lease, and assign you a personal housing coordinator.',
              },
              {
                icon: CheckCircle2,
                step: '03',
                title: 'Sign with confidence',
                desc: 'With lease review and inspection reports in hand, sign your lease knowing exactly what you\'re getting into.',
              },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative group">
                <div className="card-surface card-hover p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                      <Icon size={22} className="text-brand-800" />
                    </div>
                    <span className="text-5xl font-black text-brand-100 leading-none mt-0.5">{step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Listings ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Featured listings</h2>
              <p className="text-text-secondary">Handpicked apartments near UVM campus</p>
            </div>
            <Link href="/listings" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline">
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((property) => (
              <ListingCard key={property.id} property={property} featured />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/listings" className="btn-brand px-6 py-3 rounded-xl inline-flex items-center gap-2">
              Browse all listings
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Package Teaser ────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-200 mb-4">
                Affordable packages
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-balance">
                Expert housing help, starting at $199
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Whether you need a quick guided tour or full-service lease review and inspection support, we have a package for every student's needs.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Personal housing coordinator assigned to you',
                  'Verified listings with accurate photos',
                  'Professional lease review by local attorneys',
                  'Group discounts for roommate groups of 3–5',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-700 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/packages" className="btn-brand px-6 py-3 rounded-xl inline-flex items-center gap-2">
                Compare packages
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`card-surface p-5 ${pkg.highlighted ? 'border-gold-500/60 relative overflow-hidden' : ''}`}
                >
                  {pkg.highlighted && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold-500 text-white">Popular</span>
                    </div>
                  )}
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${pkg.highlighted ? 'gold-gradient-text' : 'text-brand-700'}`}>
                    {pkg.name}
                  </div>
                  <div className="text-3xl font-extrabold text-text-primary mb-1">${pkg.price}</div>
                  <div className="text-xs text-text-muted mb-4">one-time fee</div>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 size={12} className={`mt-0.5 shrink-0 ${pkg.highlighted ? 'text-gold-500' : 'text-brand-700'}`} />
                        {f}
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-xs text-text-muted pl-5">+{pkg.features.length - 4} more</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">Loved by UVM students</h2>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} className="star-filled" />
              ))}
              <span className="ml-2 text-sm font-semibold text-text-secondary">4.8 average rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((review) => (
              <div key={review.id} className="card-surface p-6 relative">
                <Quote size={28} className="text-brand-100 absolute top-5 right-5" />
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 italic">
                  &ldquo;{review.body.slice(0, 180)}{review.body.length > 180 ? '…' : ''}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{review.authorName}</div>
                  <div className="text-xs text-text-muted">{review.authorYear}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interest / Lead Capture ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-200 mb-4">
                Stay in the Loop
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-balance">
                Ready to find your next place?
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Drop us your details and we&apos;ll reach out with new listings, early access to available units, and tips for securing housing near UVM — before the rush.
              </p>
              <ul className="space-y-3">
                {[
                  'Get notified when new listings drop',
                  'Early access before listings go public',
                  'No spam — we only email when it matters',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-brand-700 mt-0.5 shrink-0" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div className="card-surface p-6 sm:p-8">
              <InterestForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Landlord Strip ────────────────────────────────────────────────────── */}
      <section className="bg-brand-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-800 flex items-center justify-center shrink-0">
                <Building2 size={26} className="text-brand-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Are you a Burlington landlord?</h3>
                <p className="text-brand-300 text-sm leading-relaxed max-w-md">
                  List your property with NestVT and connect with pre-qualified, coordinator-supported UVM students ready to sign leases.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link href="/for-landlords" className="btn-brand btn-outline border-brand-700 text-brand-200 hover:bg-brand-800 hover:border-brand-600 px-5 py-2.5 rounded-xl text-sm">
                Learn More
              </Link>
              <Link href="/for-landlords/submit" className="px-5 py-2.5 rounded-xl bg-white text-brand-900 font-semibold text-sm hover:bg-brand-50 transition-colors">
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
