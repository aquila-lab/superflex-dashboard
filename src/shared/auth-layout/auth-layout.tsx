import type { ReactNode } from 'react'
import { AuthWallpaper } from './auth-wallpaper'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <AuthWallpaper />

      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-xs'>{children}</div>
      </div>
    </div>
  )
}
