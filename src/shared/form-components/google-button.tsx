import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'

export const GoogleButton = ({
  isSubmitting,
  handleGoogleLogin
}: {
  isSubmitting: boolean
  handleGoogleLogin: () => void
}) => {
  return (
    <Button
      variant='outline'
      className='w-full'
      type='button'
      disabled={isSubmitting}
      onClick={handleGoogleLogin}
    >
      <Icons.Google /> Google
    </Button>
  )
}
