'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

export default function InterestForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/xdawbgdy', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center">
          <CheckCircle2 size={28} className="text-brand-700" />
        </div>
        <div>
          <p className="text-lg font-bold text-text-primary">You&apos;re on the list!</p>
          <p className="text-sm text-text-secondary mt-1">
            We&apos;ll be in touch with updates, new listings, and early access perks.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            Name <span className="text-brand-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
            Email <span className="text-brand-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@uvm.edu"
            className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
          Message <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us what you're looking for — move-in date, number of roommates, preferred neighborhood, budget, etc."
          className="w-full px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-base text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/30 focus:border-brand-700 transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-brand px-6 py-3 rounded-xl inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Express Interest'}
        {status !== 'submitting' && <Send size={15} />}
      </button>
    </form>
  )
}
