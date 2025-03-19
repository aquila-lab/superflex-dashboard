import { Button } from '@/ui/button'
import { Loader2 } from 'lucide-react'

export const SubmitButton = ({
  isSubmitting,
  text,
  loadingText
}: {
  isSubmitting: boolean
  text: string
  loadingText: string
}) => {
  return (
    <Button
      type='submit'
      className='w-full'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className='flex items-center gap-2'>
          <Loader2 className='size-4 animate-spin' />
          {loadingText}
        </span>
      ) : (
        text
      )}
    </Button>
  )
}
