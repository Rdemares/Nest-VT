import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

interface Step {
  id: string | number
  label: string
  description?: string
}

interface StepperNavProps {
  steps: Step[]
  currentStep: number
  variant?: 'horizontal' | 'vertical'
  className?: string
}

export default function StepperNav({ steps, currentStep, variant = 'horizontal', className }: StepperNavProps) {
  if (variant === 'vertical') {
    return (
      <div className={cn('space-y-0', className)}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex gap-3">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-200',
                  isCompleted
                    ? 'bg-brand-900 border-brand-900 text-white'
                    : isActive
                      ? 'bg-bg-base border-brand-700 text-brand-900'
                      : 'bg-bg-subtle border-border-default text-text-muted'
                )}>
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div className={cn(
                    'w-0.5 flex-1 min-h-[2rem] my-1 transition-colors duration-200',
                    isCompleted ? 'bg-brand-700' : 'bg-border-default'
                  )} />
                )}
              </div>

              {/* Content column */}
              <div className={cn('pb-6 pt-0.5', isLast && 'pb-0')}>
                <p className={cn(
                  'text-sm font-semibold leading-none mb-1',
                  isActive ? 'text-text-primary' : isCompleted ? 'text-brand-800 [data-theme=dark]:text-brand-400' : 'text-text-muted'
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-text-muted leading-relaxed">{step.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal
  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-200',
                isCompleted
                  ? 'bg-brand-900 border-brand-900 text-white'
                  : isActive
                    ? 'bg-bg-base border-brand-700 text-brand-900 shadow-brand-sm'
                    : 'bg-bg-subtle border-border-default text-text-muted'
              )}>
                {isCompleted ? (
                  <Check size={13} strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={cn(
                'text-xs font-medium whitespace-nowrap',
                isActive ? 'text-text-primary' : isCompleted ? 'text-brand-800 [data-theme=dark]:text-brand-400' : 'text-text-muted'
              )}>
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className={cn(
                'flex-1 h-0.5 mx-2 transition-colors duration-300',
                isCompleted ? 'bg-brand-700' : 'bg-border-default'
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}
