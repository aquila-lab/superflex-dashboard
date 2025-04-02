import { CompleteButton } from '@/shared/onboarding-components/complete-button'
import { memo } from 'react'

export const SectionFooter = memo(
  ({
    message,
    sectionId,
    isCompleted,
    onComplete,
    buttonText
  }: {
    message: string
    sectionId: string
    isCompleted: boolean
    onComplete: (id: string, completed: boolean) => void
    buttonText?: string
  }) => {
    return (
      <div className='pt-2 flex justify-between items-center'>
        <CompleteButton
          sectionId={sectionId}
          onComplete={onComplete}
          isCompleted={isCompleted}
          buttonText={buttonText}
        />
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
    )
  }
)
