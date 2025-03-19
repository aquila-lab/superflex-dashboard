import { CompleteButton } from '@/shared/complete-button/complete-button'
import { YouTubeVideo } from '@/shared/youtube-video/youtube-video'
import { CheckCircle, Sparkles } from 'lucide-react'
import { useMemo } from 'react'

export const ConnectFigmaSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const content = useMemo(() => {
    return (
      <div className='space-y-6'>
        <div className='space-y-4 text-base'>
          <p>
            Before diving into Superflex, you need to connect your Figma
            account. This allows Superflex to access your designs and use them
            as context for AI-powered assistance.
          </p>
        </div>

        <YouTubeVideo videoId='9Xn9qisQRgM' />

        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <CheckCircle className='size-5 text-green-600' />
            <h3 className='text-lg'>How to Connect Figma</h3>
          </div>

          <div className='space-y-3 pl-2'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>1</span>
              </div>
              <p>
                Click <span className='font-medium'>"Connect Figma"</span> in
                the lower panel of Superflex.
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>2</span>
              </div>
              <p>
                A new tab will open—click{' '}
                <span className='font-medium'>Allow</span> to grant Superflex
                permission to read your Figma projects.
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>3</span>
              </div>
              <p>
                Once connected, you'll be able to copy Figma selections and use
                the Figma link feature to provide design context directly to
                Superflex.
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-lg bg-green-50 border border-green-200 p-4 space-y-1 flex items-start gap-3'>
          <Sparkles className='size-5 text-green-600 mt-0.5 flex-shrink-0' />
          <div>
            <p className='font-medium text-green-800'>What you'll unlock</p>
            <p className='text-sm text-green-700'>
              With Figma connected, you can convert designs directly to code,
              get layout suggestions, and ensure your implementation matches the
              design perfectly.
            </p>
          </div>
        </div>

        <div className='pt-2 flex justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            All set? Click the button to complete onboarding! 🚀
          </p>
          <CompleteButton
            sectionId='connect-figma'
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    )
  }, [isCompleted, onComplete])

  return content
}
