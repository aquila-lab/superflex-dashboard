import { cn } from '@/lib/utils'
import { ResetPasswordRequestContent } from './reset-password-request-content'
import { AuthLink } from '@/shared/form-components/auth-link'
import { FormHeader } from '@/shared/form-components/form-header'
import type { ComponentProps } from 'react'

export const ResetPasswordRequestForm = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FormHeader
        title='Check your email'
        subtitle="We've sent a password reset link to your email address. Please check your inbox and follow the instructions."
      />
      <ResetPasswordRequestContent />
      <AuthLink
        question='Remember your password?'
        linkText='Sign in'
        linkTo='/login'
      />
    </div>
  )
}
