import { PasswordField } from '@/shared/form-components/password-field'
import { SubmitButton } from '@/shared/form-components/submit-button'
import { useNewPasswordContext } from './new-password-provider'
import { useMemo } from 'react'

export const NewPasswordFormContent = () => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    code
  } = useNewPasswordContext()

  const isDisabled = useMemo(() => isSubmitting || !code, [isSubmitting, code])

  return (
    <div className='grid gap-6'>
      <PasswordField
        password={password}
        setPassword={setPassword}
        isSubmitting={isDisabled}
        label='New Password'
      />
      <PasswordField
        password={confirmPassword}
        setPassword={setConfirmPassword}
        isSubmitting={isDisabled}
        label='Confirm New Password'
        id='confirmPassword'
      />
      <SubmitButton
        isSubmitting={isDisabled}
        text='Update password'
        loadingText='Updating password...'
      />
    </div>
  )
}
