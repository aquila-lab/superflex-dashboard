import { useUpdateUser, useUser } from '@/lib/hooks'
import { isOnboardingComplete } from '@/lib/utils'
import { UserAvatar } from '@/shared/user-avatar/user-avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/ui/card'
import { useMemo } from 'react'
import { OnboardingStatusSection } from './onboarding-status-section'
import { UserNameEditDialog } from './user-name-edit-dialog'

export const UserInfoCard = () => {
  const { data: user } = useUser()

  const userOnboardingComplete = useMemo(() => {
    return isOnboardingComplete(user?.onboarding_step ?? null)
  }, [user?.onboarding_step])

  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4'>
        <UserAvatar size={56} />
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <CardTitle>{user?.username || 'User'}</CardTitle>
            <UserNameEditDialog
              currentUsername={user?.username}
              updateUser={useUpdateUser()}
            />
          </div>
          <CardDescription>{user?.email || ''}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <OnboardingStatusSection isComplete={userOnboardingComplete} />
      </CardContent>
    </Card>
  )
}
