import { Badge } from '@/ui/badge'

export const OnboardingStatusSection = ({
  isComplete
}: {
  isComplete: boolean
}) => {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium'>Onboarding Status</span>
          <Badge variant={isComplete ? 'default' : 'secondary'}>
            {isComplete ? 'Complete' : 'In Progress'}
          </Badge>
        </div>
        {!isComplete && (
          <div className='text-sm text-muted-foreground'>
            Complete the onboarding process to access all features
          </div>
        )}
      </div>
    </div>
  )
}
