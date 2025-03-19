import { cn } from '@/lib/utils'
import { useResetPasswordContext } from './reset-password-provider'
import type { ComponentProps } from 'react'
import { ResetPasswordFormContent } from './reset-password-form-content'
import { AuthLink } from '@/shared/form-components/auth-link'
import { FormHeader } from '@/shared/form-components/form-header'

export const ResetPasswordForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const { handleSubmit } = useResetPasswordContext()

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FormHeader
        title='Forgot your password?'
        subtitle='Enter your email below to reset your password'
      />
      <ResetPasswordFormContent />
      <AuthLink
        question='Remember your password?'
        linkText='Sign in'
        linkTo='/login'
      />
    </form>
  )
}
