import { AuthWallpaper } from '@/shared/auth-wallpaper/auth-wallpaper'
import { RegisterForm } from './register-form'
import { RegisterProvider } from './register-provider'

export const RegisterPage = () => {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <AuthWallpaper />

      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs'>
          <RegisterProvider>
            <RegisterForm />
          </RegisterProvider>
        </div>
      </div>
    </div>
  )
}
