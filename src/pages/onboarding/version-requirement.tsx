import { InfoBox } from '@/shared/onboarding-components/info-box'
import { AlertTriangle } from 'lucide-react'

export const VersionRequirement = () => {
  return (
    <InfoBox
      icon={<AlertTriangle className='size-5 text-amber-600' />}
      title='Version Requirement'
      variant='warning'
    >
      <p className='text-sm text-amber-700'>
        Superflex requires VS Code v1.70.0 or higher. If you already have VS
        Code installed, check your version via{' '}
        <span className='font-medium'>Help &gt; About</span> and update if
        needed.
      </p>
    </InfoBox>
  )
}
