import { Divider } from '@/shared/form-components/divider'
import { EmailField } from '@/shared/form-components/email-field'
import { GoogleButton } from '@/shared/form-components/google-button'
import { PasswordField } from '@/shared/form-components/password-field'
import { SubmitButton } from '@/shared/form-components/submit-button'
import { useLoginContext } from './login-provider'

export const LoginFormContent = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    handleGoogleLogin
  } = useLoginContext()

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
        showForgotPassword
      />
      <SubmitButton
        isSubmitting={isSubmitting}
        text='Login'
        loadingText='Signing in...'
      />
      <Divider />
      <GoogleButton
        isSubmitting={isSubmitting}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  )
}
