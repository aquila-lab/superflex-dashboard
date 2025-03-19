import { CompleteButton } from '@/shared/complete-button/complete-button'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { AlertTriangle, Download } from 'lucide-react'
import { useMemo } from 'react'

export const DownloadVSCodeSection = ({
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
            To start using Superflex, you'll need a code editor that supports
            its features. We recommend using Visual Studio Code (VS Code) or
            Cursor for the best experience.
          </p>
        </div>

        <div className='grid gap-6'>
          <div className='rounded-lg border p-4 space-y-3'>
            <div className='flex items-center gap-2 font-medium'>
              <Icons.VSCode className='size-5 text-blue-600' />
              <h3 className='text-lg'>Visual Studio Code</h3>
            </div>
            <p>
              Visual Studio Code is a lightweight but powerful source code
              editor available for Windows, macOS, and Linux.
            </p>
            <div className='rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3'>
              <AlertTriangle className='size-5 text-amber-600 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-amber-800'>
                  Version Requirement
                </p>
                <p className='text-sm text-amber-700'>
                  Superflex requires VS Code v1.70.0 or higher. If you already
                  have VS Code installed, check your version via{' '}
                  <span className='font-medium'>Help &gt; About</span> and
                  update if needed.
                </p>
              </div>
            </div>
            <Button
              asChild
              variant='outline'
              className='mt-2'
            >
              <a
                href='https://code.visualstudio.com/download'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Download className='mr-2 size-4' />
                Download VS Code
              </a>
            </Button>
          </div>

          <div className='rounded-lg border p-4 space-y-3'>
            <div className='flex items-center gap-2 font-medium'>
              <Icons.Cursor className='size-5 text-purple-600' />
              <h3 className='text-lg'>Cursor</h3>
            </div>
            <p>
              Cursor is an AI-enhanced version of VS Code, optimized for
              AI-assisted development with built-in AI capabilities for code
              generation, explanation, and debugging.
            </p>
            <Button
              asChild
              variant='outline'
              className='mt-2'
            >
              <a
                href='https://cursor.sh'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Download className='mr-2 size-4' />
                Download Cursor
              </a>
            </Button>
          </div>
        </div>

        <div className='pt-2 flex justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            Once installed, you're ready to proceed to the next step! 🚀
          </p>
          <CompleteButton
            sectionId='download-vscode'
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        </div>
      </div>
    )
  }, [isCompleted, onComplete])

  return content
}
