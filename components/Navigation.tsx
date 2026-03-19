'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Leaf, Menu, X, ChevronRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { href: '/listings', label: 'Browse Listings' },
  { href: '/packages', label: 'Packages' },
  { href: '/for-landlords', label: 'For Landlords' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-bg-base/90 backdrop-blur-md border-b border-border-default transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="NestVT home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-900 text-white group-hover:bg-brand-800 transition-colors">
                <Leaf size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-brand-900 [data-theme=dark]:text-brand-400">
                Nest<span className="text-brand-700 [data-theme=dark]:text-brand-300">VT</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                    pathname === href || pathname.startsWith(href + '/')
                      ? 'bg-brand-50 text-brand-900 [data-theme=dark]:bg-brand-900/20 [data-theme=dark]:text-brand-400'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle'
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/student/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors px-3 py-2 rounded-lg hover:bg-bg-subtle"
              >
                Dashboard
              </Link>
              <Link
                href="/packages"
                className="btn-brand text-sm px-4 py-2"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-subtle transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} className="text-text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[calc(100vw-2rem)] bg-bg-base shadow-2xl md:hidden',
          'transform transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-900 text-white">
                <Leaf size={16} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-brand-900">NestVT</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-bg-subtle transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Drawer nav */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'bg-brand-50 text-brand-900'
                    : 'text-text-primary hover:bg-bg-subtle'
                )}
              >
                {label}
                <ChevronRight size={16} className="text-text-muted" />
              </Link>
            ))}
            <div className="pt-2 border-t border-border-default mt-2">
              <Link
                href="/student/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-primary hover:bg-bg-subtle transition-colors"
              >
                My Dashboard
                <ChevronRight size={16} className="text-text-muted" />
              </Link>
            </div>
          </nav>

          {/* Drawer footer */}
          <div className="px-4 pb-6 pt-4 border-t border-border-default space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted font-medium">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              href="/packages"
              onClick={() => setMobileOpen(false)}
              className="btn-brand w-full text-sm justify-center"
            >
              Get Started
            </Link>
            <Link
              href="/for-landlords/submit"
              onClick={() => setMobileOpen(false)}
              className="btn-brand btn-outline w-full text-sm justify-center"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
