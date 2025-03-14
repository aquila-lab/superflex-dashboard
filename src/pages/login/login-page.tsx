import { AuthWallpaper } from '@/shared/auth-wallpaper'
import { LoginForm } from './login-form'
import { useUrlParamsStorage } from '@/shared/hooks/use-url-params-storage'

export const LoginPage = () => {
  useUrlParamsStorage()

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <AuthWallpaper />

      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
