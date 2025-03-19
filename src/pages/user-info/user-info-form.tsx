import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import type { ComponentProps } from 'react'
import { UserInfoFormContent } from './user-info-form-content'
import { useUserInfoContext } from './user-info-provider'
import { UserInfoHeader } from './user-info-header'

export const UserInfoForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const { handleSubmit } = useUserInfoContext()

  const formClasses = useMemo(() => cn('space-y-6', className), [className])

  return (
    <div className='space-y-8'>
      <UserInfoHeader />
      <form
        onSubmit={handleSubmit}
        className={formClasses}
        {...props}
      >
        <UserInfoFormContent />
      </form>
    </div>
  )
}
