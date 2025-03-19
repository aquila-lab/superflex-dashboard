import { memo } from 'react'

export const StepList = memo(
  ({
    steps
  }: {
    steps: Array<{ id: string; text: string }>
  }) => {
    return (
      <div className='space-y-3 pl-2'>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className='flex items-center gap-3'
          >
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <span className='text-xs font-medium'>{index + 1}</span>
            </div>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    )
  }
)
