import { memo } from 'react'
import { CompleteButton } from '@/shared/onboarding-components/complete-button'

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
        <p className='text-sm text-muted-foreground'>{message}</p>
        <CompleteButton
          sectionId={sectionId}
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      </div>
    )
  }
)
