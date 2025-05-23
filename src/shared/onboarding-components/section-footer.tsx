import { CompleteButton } from '@/shared/onboarding-components/complete-button'
import { memo } from 'react'

export const SectionFooter = memo(
  ({
    message,
    sectionId,
    isCompleted,
    onComplete
  }: {
    message: string
    sectionId: string
    isCompleted: boolean
    onComplete: (id: string, completed: boolean) => void
  }) => {
    return (
      <div className='pt-2 flex justify-between items-center'>
        <CompleteButton
          sectionId={sectionId}
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
    )
  }
)
