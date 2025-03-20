import { useUser } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import type { ComponentProps } from 'react'
import { useMemo } from 'react'

export const UserAvatar = ({
  className,
  imageClassName,
  fallbackClassName,
  size = 40,
  ...props
}: {
  className?: string
  imageClassName?: string
  fallbackClassName?: string
  size?: number
} & Omit<ComponentProps<typeof Avatar>, 'children'>) => {
  const { data: user } = useUser()

  const userInitials = useMemo(() => {
    if (!user?.username) {
      return 'U'
    }

    return user.username.substring(0, 2).toUpperCase()
  }, [user])

  return (
    <Avatar
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <AvatarImage
        key={user?.picture}
        src={user?.picture || undefined}
        alt={user?.username || 'User'}
        width={size}
        height={size}
        className={cn('object-cover', imageClassName)}
      />
      <AvatarFallback className={fallbackClassName}>
        {userInitials}
      </AvatarFallback>
    </Avatar>
  )
}
