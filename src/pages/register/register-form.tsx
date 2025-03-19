import { cn } from '@/lib/utils'
import { AuthLink } from '@/shared/form-components/auth-link'
import { FormHeader } from '@/shared/form-components/form-header'
import type { ComponentProps } from 'react'
import { RegisterFormContent } from './register-form-content'
import { useRegisterContext } from './register-provider'

export const RegisterForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const { handleSubmit } = useRegisterContext()

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FormHeader
        title='Sign up'
        subtitle='Create an account to get started'
      />
      <RegisterFormContent />
      <AuthLink
        question='Already have an account?'
        linkText='Sign in'
        linkTo='/login'
      />
    </form>
  )
}
