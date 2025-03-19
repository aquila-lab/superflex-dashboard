import { Divider } from '@/shared/form-components/divider'
import { EmailField } from '@/shared/form-components/email-field'
import { GoogleButton } from '@/shared/form-components/google-button'
import { PasswordField } from '@/shared/form-components/password-field'
import { SubmitButton } from '@/shared/form-components/submit-button'
import { useRegisterContext } from './register-provider'

export const RegisterFormContent = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    handleGoogleLogin
  } = useRegisterContext()

  return (
    <div className='grid gap-6'>
      <EmailField
        email={email}
        setEmail={setEmail}
        isSubmitting={isSubmitting}
      />
      <PasswordField
        password={password}
        setPassword={setPassword}
        isSubmitting={isSubmitting}
      />
      <PasswordField
        password={confirmPassword}
        setPassword={setConfirmPassword}
        isSubmitting={isSubmitting}
        label='Confirm Password'
        id='confirmPassword'
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        text='Create an account'
        loadingText='Creating account...'
      />
      <Divider />
      <GoogleButton
        isSubmitting={isSubmitting}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  )
}
