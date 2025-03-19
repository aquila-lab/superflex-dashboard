import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export const EmailField = ({
  email,
  setEmail,
  isSubmitting
}: {
  email: string
  setEmail: (email: string) => void
  isSubmitting: boolean
}) => {
  return (
    <div className='grid gap-3'>
      <Label htmlFor='email'>Email</Label>
      <Input
        id='email'
        type='email'
        placeholder='youremail@example.com'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
      />
    </div>
  )
}
