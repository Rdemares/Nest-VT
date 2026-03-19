'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

type ThemeOption = 'light' | 'dark' | 'system'

const options: { value: ThemeOption; icon: LucideIcon; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
  { value: 'dark', icon: Moon, label: 'Dark' },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-0.5 rounded-lg p-0.5 bg-bg-subtle border border-border-default h-9 w-[108px] animate-pulse" />
    )
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg p-0.5 bg-bg-subtle border border-border-default"
      role="group"
      aria-label="Theme toggle"
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          className={cn(
            'flex items-center justify-center w-8 h-7 rounded-md transition-all duration-200',
            theme === value
              ? 'bg-bg-elevated shadow-sm text-text-brand border border-border-brand'
              : 'text-text-muted hover:text-text-secondary hover:bg-bg-elevated/50'
          )}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  )
}
