import { withErrorHandling } from '@/lib/error-handling'
import type { UpdateUserMutation } from '@/lib/types'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Pen } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export const UserNameEditDialog = ({
  currentUsername,
  updateUser
}: {
  currentUsername?: string
  updateUser: UpdateUserMutation
}) => {
  const [username, setUsername] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (!username.trim()) {
      toast.error('Username cannot be empty')
      return
    }

    const updateUsername = withErrorHandling(
      async () => {
        return await updateUser.mutateAsync({ username })
      },
      {
        successMessage: 'Username updated successfully',
        errorMessage: 'Failed to update username. Please try again.',
        onSuccess: () => setIsDialogOpen(false)
      }
    )

    await updateUsername()
  }, [username, updateUser])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <button
          type='button'
          className='text-muted-foreground hover:text-primary transition-colors'
          aria-label='Edit username'
        >
          <Pen className='size-3 cursor-pointer' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='username'>New Username</Label>
            <Input
              id='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={currentUsername || 'Username'}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={updateUser.isPending || !username.trim()}
          >
            {updateUser.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
