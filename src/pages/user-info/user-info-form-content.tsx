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
import { useMemo } from 'react'
import { useUserInfoContext } from './user-info-provider'
import type { ReferralSource, TechnicalLevel } from '@/lib/types'
import {
  REFERAL_SOURCE_OPTIONS,
  TECHNICAL_LEVEL_OPTIONS
} from '@/lib/constants'

export const UserInfoFormContent = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    title,
    setTitle,
    company,
    setCompany,
    technicalLevel,
    setTechnicalLevel,
    referralSource,
    setReferralSource,
    isSubmitting
  } = useUserInfoContext()

  const optionalLabel = useMemo(
    () => <span className='text-xs text-muted-foreground'>(optional)</span>,
    []
  )

  return (
    <>
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
          onValueChange={value =>
            setTechnicalLevel(value as TechnicalLevel | '')
          }
        >
          <SelectTrigger
            id='technicalLevel'
            className='w-full'
          >
            <SelectValue placeholder='Select your technical level' />
          </SelectTrigger>
          <SelectContent className='w-full'>
            <SelectGroup>
              {TECHNICAL_LEVEL_OPTIONS.map(option => (
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
        <Label htmlFor='title'>Title {optionalLabel}</Label>
        <Input
          id='title'
          placeholder='Software Engineer'
          className='w-full'
          value={title ?? ''}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='space-y-3'>
        <Label htmlFor='company'>Company {optionalLabel}</Label>
        <Input
          id='company'
          placeholder='Acme Inc.'
          className='w-full'
          value={company ?? ''}
          onChange={e => setCompany(e.target.value)}
        />
      </div>

      <div className='space-y-3'>
        <Label htmlFor='referralSource'>How did you hear about us?</Label>
        <Select
          value={referralSource}
          onValueChange={value =>
            setReferralSource(value as ReferralSource | '')
          }
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
              {REFERAL_SOURCE_OPTIONS.map(option => (
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
    </>
  )
}
