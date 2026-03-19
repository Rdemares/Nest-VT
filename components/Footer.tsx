import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-border-default mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-900 text-white">
                <Leaf size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-brand-900 text-text-brand">NestVT</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Burlington's trusted housing platform for UVM students. Find, tour, and secure your perfect apartment — with a coordinator by your side.
            </p>
            <div className="space-y-2">
              <a href="mailto:hello@nestvt.com" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-brand transition-colors">
                <Mail size={14} />
                hello@nestvt.com
              </a>
              <a href="tel:+18025550100" className="flex items-center gap-2 text-sm text-text-muted hover:text-text-brand transition-colors">
                <Phone size={14} />
                (802) 555-0100
              </a>
              <span className="flex items-center gap-2 text-sm text-text-muted">
                <MapPin size={14} />
                Burlington, VT 05401
              </span>
            </div>
          </div>

          {/* Students */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Students</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/listings', label: 'Browse Listings' },
                { href: '/packages', label: 'Packages & Pricing' },
                { href: '/packages/checkout', label: 'Book a Package' },
                { href: '/student/dashboard', label: 'My Dashboard' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-text-secondary hover:text-text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Landlords */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Landlords</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/for-landlords', label: 'Why NestVT?' },
                { href: '/for-landlords/submit', label: 'List Your Property' },
                { href: '/landlord/dashboard', label: 'Landlord Dashboard' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-text-secondary hover:text-text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'About NestVT' },
                { href: '/', label: 'How It Works' },
                { href: '/', label: 'Testimonials' },
                { href: '/', label: 'Contact Us' },
              ].map(({ href, label }, i) => (
                <li key={i}>
                  <Link href={href} className="text-sm text-text-secondary hover:text-text-brand transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} NestVT. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
