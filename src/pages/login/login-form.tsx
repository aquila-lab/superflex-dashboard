import { cn } from '@/lib/utils'
import { useLoginContext } from './login-provider'
import type { ComponentProps } from 'react'
import { LoginFormContent } from './login-form-content'
import { AuthLink } from '@/shared/form-components/auth-link'
import { FormHeader } from '@/shared/form-components/form-header'

export const LoginForm = ({ className, ...props }: ComponentProps<'form'>) => {
  const { handleSubmit } = useLoginContext()

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FormHeader
        title='Sign in'
        subtitle='Enter your email below to login to your account'
      />
      <LoginFormContent />
      <AuthLink
        question="Don't have an account?"
        linkText='Sign up'
        linkTo='/register'
      />
    </form>
  )
}
