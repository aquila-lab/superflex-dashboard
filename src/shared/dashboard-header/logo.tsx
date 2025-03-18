import { Icons } from '@/ui/icons'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link
      to='/dashboard'
      className='flex items-center gap-2'
    >
      <div className='flex items-center justify-start'>
        <Icons.Logo className='h-10 w-8' />
      </div>
    </Link>
  )
}
