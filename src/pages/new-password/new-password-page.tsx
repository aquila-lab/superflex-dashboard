import { AuthWallpaper } from '@/shared/auth-wallpaper/auth-wallpaper'
import { NewPasswordForm } from './new-password-form'

export const NewPasswordPage = () => (
  <div className='grid min-h-svh lg:grid-cols-2'>
    <AuthWallpaper />

    <div className='flex flex-1 items-center justify-center'>
      <div className='w-full max-w-xs'>
        <NewPasswordForm />
      </div>
    </div>
  </div>
)
