import { Button } from '@/ui/button'
import { CheckCircle } from 'lucide-react'
import { useMemo } from 'react'

export const CompleteButton = ({
  sectionId,
  onComplete,
  isCompleted
}: {
  sectionId: string
  onComplete: (id: string, completed: boolean) => void
  isCompleted: boolean
}) => {
  const content = useMemo(() => {
    if (isCompleted) {
      return (
        <div className='flex items-center text-green-600 gap-2'>
          <CheckCircle className='size-5' />
          <span className='text-sm font-medium'>Completed</span>
        </div>
      )
    }

    return (
      <Button
        variant='default'
        onClick={() => onComplete(sectionId, true)}
      >
        <CheckCircle className='size-4 mr-2' />
        Mark as complete
      </Button>
    )
  }, [isCompleted, onComplete, sectionId])

  return content
}
