import { AuthWallpaper } from '@/shared/auth-wallpaper/auth-wallpaper'
import { ResetPasswordForm } from './reset-password-form'

export const ResetPasswordPage = () => (
  <div className='grid min-h-svh lg:grid-cols-2'>
    <AuthWallpaper />

    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full max-w-xs'>
        <ResetPasswordForm />
      </div>
    </div>
  </div>
)
