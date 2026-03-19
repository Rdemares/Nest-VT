import Link from 'next/link'
import { Leaf, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-6">
          <Leaf size={28} className="text-brand-700" />
        </div>
        <h1 className="text-6xl font-extrabold text-brand-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-text-primary mb-3">Page not found</h2>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-brand px-6 py-3 rounded-xl text-sm font-semibold">
            Go Home
          </Link>
          <Link href="/listings" className="btn-brand btn-outline px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5">
            Browse Listings
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
