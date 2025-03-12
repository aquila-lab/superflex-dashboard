import { Icons } from '@/ui/icons'
import { Link } from 'react-router-dom'

export const AuthWallpaper = () => {
  return (
    <div className='relative hidden lg:flex h-full flex-col bg-muted p-10 text-white dark:border-r'>
      <div className='absolute inset-0 bg-zinc-900' />
      <Link
        to='/sign-in'
        className='relative z-20 flex items-center text-lg font-medium cursor-pointer w-min'
      >
        <Icons.Logo className='mr-2 size-6' />
        Superflex
      </Link>
      <div className='relative z-20 mt-auto'>
        <blockquote className='space-y-2'>
          <p className='text-lg'>
            &ldquo;
            {"Change starts with you, but it doesn't start until you do."}
            &rdquo;
          </p>
          <footer className='text-sm'>Tom Ziglar</footer>
        </blockquote>
      </div>
    </div>
  )
}
