import { cn } from '@/lib/utils'
import { useUpdateUser } from '@/lib/hooks'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui/select'
import { useCallback, useMemo, useState } from 'react'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { TechnicalLevel, ReferralSource } from '@/lib/types'

export const UserInfoForm = ({
  className,
  ...props
}: ComponentProps<'form'>) => {
  const navigate = useNavigate()
  const updateUser = useUpdateUser()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [company, setCompany] = useState<string | undefined>(undefined)
  const [technicalLevel, setTechnicalLevel] = useState<TechnicalLevel | ''>('')
  const [referralSource, setReferralSource] = useState<ReferralSource | ''>('')

  const referralSourceOptions = useMemo(
    () =>
      [
        { value: 'vscode', label: 'VSCode' },
        { value: 'google', label: 'Google' },
        { value: 'reddit', label: 'Reddit' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'twitter', label: 'X/Twitter' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'friend', label: 'Friend' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'other', label: 'Other' }
      ] as const,
    []
  )

  const technicalLevelOptions = useMemo(
    () =>
      [
        { value: 'non-technical', label: 'Non Technical' },
        { value: 'technical', label: 'Technical' },
        { value: 'highly-technical', label: 'Highly Technical' }
      ] as const,
    []
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      setIsSubmitting(true)

      try {
        await updateUser.mutateAsync({
          first_name: firstName,
          last_name: lastName,
          title,
          company,
          onboarding_step: 2
        })

        toast.success('Your profile information has been saved')
        navigate('/dashboard/onboarding')
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [firstName, lastName, title, company, updateUser, navigate]
  )

  return (
    <div className='space-y-8'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Tell us about yourself
        </h1>
        <p className='text-muted-foreground'>
          Help us personalize your experience
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className={cn('space-y-6', className)}
        {...props}
      >
        <div className='space-y-3'>
          <Label htmlFor='firstName'>First name</Label>
          <Input
            id='firstName'
            placeholder='John'
            className='w-full'
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className='space-y-3'>
          <Label htmlFor='lastName'>Last name</Label>
          <Input
            id='lastName'
            placeholder='Doe'
            className='w-full'
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className='space-y-3'>
          <Label htmlFor='technicalLevel'>Technical Expertise Level</Label>
          <Select
            required
            value={technicalLevel}
            onValueChange={value => setTechnicalLevel(value as TechnicalLevel)}
          >
            <SelectTrigger
              id='technicalLevel'
              className='w-full'
            >
              <SelectValue placeholder='Select your technical level' />
            </SelectTrigger>
            <SelectContent className='w-full'>
              <SelectGroup>
                {technicalLevelOptions.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-3'>
          <Label htmlFor='title'>
            Title{' '}
            <span className='text-xs text-muted-foreground'>(optional)</span>
          </Label>
          <Input
            id='title'
            placeholder='Software Engineer'
            className='w-full'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className='space-y-3'>
          <Label htmlFor='company'>
            Company{' '}
            <span className='text-xs text-muted-foreground'>(optional)</span>
          </Label>
          <Input
            id='company'
            placeholder='Acme Inc.'
            className='w-full'
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </div>

        <div className='space-y-3'>
          <Label htmlFor='referralSource'>How did you hear about us?</Label>
          <Select
            value={referralSource}
            onValueChange={value => setReferralSource(value as ReferralSource)}
            required
          >
            <SelectTrigger
              id='referralSource'
              className='w-full'
            >
              <SelectValue placeholder='Select a source' />
            </SelectTrigger>
            <SelectContent className='w-full'>
              <SelectGroup>
                {referralSourceOptions.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </form>
    </div>
  )
}
