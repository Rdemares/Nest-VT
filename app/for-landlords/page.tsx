import Link from 'next/link'
import { CheckCircle2, Building2, Users, Star, Shield, BarChart3, Clock, ArrowRight, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Landlords — List Your Burlington Property',
  description: 'Reach pre-qualified UVM students looking for off-campus housing. NestVT connects Burlington landlords with motivated, coordinator-supported renters.',
}

const BENEFITS = [
  {
    icon: Users,
    title: 'Pre-qualified student renters',
    desc: 'Every student using NestVT has paid for our service, which signals serious housing intent. Fewer tire-kickers, more signed leases.',
  },
  {
    icon: Shield,
    title: 'Coordinator-backed applicants',
    desc: 'Each student has a NestVT coordinator guiding them through the process. Tours are scheduled, questions are pre-answered.',
  },
  {
    icon: BarChart3,
    title: 'Real analytics & visibility',
    desc: 'Track listing views, tour requests, and student interest from your landlord dashboard in real time.',
  },
  {
    icon: Clock,
    title: 'Faster time to lease',
    desc: 'Properties listed on NestVT fill an average of 3 weeks faster than those listed on general platforms.',
  },
  {
    icon: Star,
    title: 'Verified reviews',
    desc: 'Earn verified reviews from past tenants that build your landlord reputation with future students.',
  },
  {
    icon: Zap,
    title: 'Zero upfront cost',
    desc: 'Listing your property on NestVT is completely free. We earn from students, not landlords.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Submit your listing',
    desc: 'Use our simple 4-step form to submit property details, photos, and availability.',
  },
  {
    step: '02',
    title: 'We verify & publish',
    desc: 'Our team reviews your listing within 48 hours and publishes it to qualified UVM students.',
  },
  {
    step: '03',
    title: 'Students book tours',
    desc: 'Interested students schedule tours through their coordinator. You get confirmed appointments — no no-shows.',
  },
  {
    step: '04',
    title: 'Sign leases with confidence',
    desc: 'Students sign leases having had professional review. Less back-and-forth, more successful tenancies.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Tom & Mary K.',
    role: 'Hill Section landlords, 8 years',
    body: 'We listed two units on NestVT and had qualified tour requests within a week. Both units are signed for fall. The coordinator-prepared students ask the right questions and sign quickly.',
    rating: 5,
  },
  {
    name: 'Vermont Property Group',
    role: 'South End — 12 units',
    body: "NestVT students are the best tenants we've had. They come pre-briefed on the lease, know what to expect, and have a coordinator to handle their questions. Reduced our turnover significantly.",
    rating: 5,
  },
  {
    name: 'Patricia S.',
    role: 'Old North End — 3BR house',
    body: 'I was skeptical at first but the platform is incredibly easy to use. The listing form took 10 minutes and my unit was live the next day. Already planning to relist next year.',
    rating: 4,
  },
]

export default function ForLandlordsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-800/60 border border-brand-700/50 text-brand-200 text-sm font-medium mb-6">
              <Building2 size={13} />
              For Burlington Landlords
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5 text-balance">
              Fill vacancies faster with{' '}
              <span className="text-brand-300">UVM-ready</span> students
            </h1>
            <p className="text-brand-200 text-lg leading-relaxed mb-8">
              NestVT connects your listings directly with UVM students who have coordinator support, are pre-qualified, and ready to sign. Zero cost to landlords.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/for-landlords/submit" className="btn-brand px-6 py-3.5 text-base rounded-xl bg-white text-brand-900 hover:bg-brand-50">
                List Your Property — Free
                <ArrowRight size={18} />
              </Link>
              <Link href="/landlord/dashboard" className="btn-brand btn-outline px-6 py-3.5 text-base rounded-xl border-white/30 text-white hover:bg-white/10">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L1440 60L1440 20C1440 20 1080 0 720 0C360 0 0 20 0 20L0 60Z" fill="var(--color-bg-base)" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-bg-base border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '200+', label: 'Active students searching' },
              { value: '3 wks', label: 'Faster average lease time' },
              { value: '100%', label: 'Free for landlords' },
              { value: '48hr', label: 'Listing review turnaround' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-brand-900 gradient-text mb-1">{value}</div>
                <div className="text-sm text-text-secondary">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">Why landlords choose NestVT</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Built for Burlington property owners who want better tenants, faster.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-surface card-hover p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-800" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">How listing works</h2>
            <p className="text-text-secondary">From submission to signed lease in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="card-surface p-6 relative">
                <div className="text-5xl font-black text-brand-100 leading-none mb-4">{step}</div>
                <h3 className="font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-bg-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary text-center mb-10">
            What landlords are saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, body, rating }) => (
              <div key={name} className="card-surface p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="star-filled" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary italic leading-relaxed mb-4">
                  &ldquo;{body}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{name}</div>
                  <div className="text-xs text-text-muted">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to list your property?</h2>
          <p className="text-brand-200 mb-8 text-lg">
            It takes 10 minutes and it&apos;s completely free. Reach hundreds of UVM students looking for housing right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/for-landlords/submit" className="px-8 py-3.5 rounded-xl bg-white text-brand-900 font-semibold text-base hover:bg-brand-50 transition-colors inline-flex items-center gap-2">
              Submit Your Listing
              <ArrowRight size={18} />
            </Link>
            <Link href="/landlord/dashboard" className="btn-brand btn-outline px-8 py-3.5 rounded-xl text-base border-white/30 text-white hover:bg-white/10">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
