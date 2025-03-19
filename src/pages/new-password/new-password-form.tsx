import { cn } from '@/lib/utils'
import { AuthLink } from '@/shared/form-components/auth-link'
import { FormHeader } from '@/shared/form-components/form-header'
import type { ComponentProps } from 'react'
import { NewPasswordFormContent } from './new-password-form-content'
import { useNewPasswordContext } from './new-password-provider'

export const NewPasswordForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const { handleSubmit } = useNewPasswordContext()

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FormHeader
        title='Set new password'
        subtitle='Enter your new password below'
      />
      <NewPasswordFormContent />
      <AuthLink
        question='Remember your password?'
        linkText='Sign in'
        linkTo='/login'
      />
    </form>
  )
}
