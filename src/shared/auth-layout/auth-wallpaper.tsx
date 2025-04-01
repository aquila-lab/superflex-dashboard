import { Icons } from '@/ui/icons'
import { Link } from 'react-router-dom'

export const AuthWallpaper = () => (
  <div className='relative hidden lg:flex h-full flex-col bg-muted p-10 text-white dark:border-r'>
    <div className='absolute inset-0 bg-zinc-900' />
    <div
      className='absolute right-0 top-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cover rounded-3xl overflow-hidden opacity-75'
      style={{
        backgroundImage: 'url(/superflex.png)',
        backgroundPosition: 'left'
      }}
    />
    <div
      className='absolute inset-0'
      style={{
        backgroundImage:
          'radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.85) 100%)'
      }}
    />
    <Link
      to='/login'
      className='relative z-20 flex items-center text-lg font-medium cursor-pointer w-min'
    >
      <Icons.Logo className='mr-2 size-6' />
      Superflex
    </Link>
    <div className='relative z-20 mt-auto'>
      <blockquote className='space-y-2'>
        <p className='text-lg'>
          &ldquo;
          {'Superflex saves our front-end developers 10 hours a week.'}
          &rdquo;
        </p>
        <footer className='text-sm'>
          Manrav Khosa, Founder at Kordova Tek
        </footer>
      </blockquote>
    </div>
  </div>
)
