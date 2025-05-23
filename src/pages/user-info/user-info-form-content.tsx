import {
  REFERAL_SOURCE_OPTIONS,
  TECHNICAL_LEVEL_OPTIONS
} from '@/lib/constants'
import type { ReferralSource, TechnicalLevel } from '@/lib/types'
import { useUser } from '@/lib/hooks'
import { SelectField } from '@/shared/form-components/select-field'
import { SubmitButton } from '@/shared/form-components/submit-button'
import { TextField } from '@/shared/form-components/text-field'
import { useUserInfoContext } from './user-info-provider'
import { useMemo } from 'react'

export const UserInfoFormContent = () => {
  const { data: user } = useUser()
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

  const shouldShowNameFields = useMemo(() => {
    return !user?.first_name || !user?.last_name
  }, [user?.first_name, user?.last_name])

  return (
    <div className='grid gap-6'>
      {shouldShowNameFields && (
        <>
          <TextField
            id='firstName'
            label='First name'
            placeholder='John'
            value={firstName}
            setValue={setFirstName}
            isSubmitting={isSubmitting}
            required
          />

          <TextField
            id='lastName'
            label='Last name'
            placeholder='Doe'
            value={lastName}
            setValue={setLastName}
            isSubmitting={isSubmitting}
            required
          />
        </>
      )}

      <SelectField
        id='technicalLevel'
        label='Technical expertise'
        placeholder='Select your technical level'
        value={technicalLevel}
        setValue={value => setTechnicalLevel(value as TechnicalLevel | '')}
        options={TECHNICAL_LEVEL_OPTIONS}
        isSubmitting={isSubmitting}
        required
      />

      <SelectField
        id='referralSource'
        label='How did you hear about us?'
        placeholder='Select a source'
        value={referralSource}
        setValue={value => setReferralSource(value as ReferralSource | '')}
        options={REFERAL_SOURCE_OPTIONS}
        isSubmitting={isSubmitting}
        required
      />

      <TextField
        id='title'
        label='Title'
        placeholder='Software Engineer'
        value={title ?? ''}
        setValue={setTitle}
        isSubmitting={isSubmitting}
        optional
      />

      <TextField
        id='company'
        label='Company'
        placeholder='Acme Inc.'
        value={company ?? ''}
        setValue={setCompany}
        isSubmitting={isSubmitting}
        optional
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        text='Continue'
        loadingText='Saving...'
      />
    </div>
  )
}
