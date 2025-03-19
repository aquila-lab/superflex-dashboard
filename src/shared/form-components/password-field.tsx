import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Link } from 'react-router-dom'

export const PasswordField = ({
  password,
  setPassword,
  isSubmitting,
  showForgotPassword = false,
  label = 'Password',
  id = 'password'
}: {
  password: string
  setPassword: (password: string) => void
  isSubmitting: boolean
  showForgotPassword?: boolean
  label?: string
  id?: string
}) => {
  return (
    <div className='grid gap-3'>
      <div className='flex items-center'>
        <Label htmlFor={id}>{label}</Label>
        {showForgotPassword && (
          <Link
            to='/forgot-password'
            className='ml-auto text-sm leading-none underline-offset-4 hover:underline'
          >
            Forgot your password?
          </Link>
        )}
      </div>
      <Input
        id={id}
        type='password'
        placeholder='********'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        disabled={isSubmitting}
      />
    </div>
  )
}
