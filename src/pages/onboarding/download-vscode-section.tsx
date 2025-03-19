import { AlertTriangle, Download } from 'lucide-react'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { OnboardingSection } from '@/shared/onboarding-components/onboarding-section'
import { SectionFooter } from '@/shared/onboarding-components/section-footer'
import { SectionIntro } from '@/shared/onboarding-components/section-intro'

export const DownloadVSCodeSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  return (
    <OnboardingSection>
      <SectionIntro text="To start using Superflex, you'll need a code editor that supports its features. We recommend using Visual Studio Code (VS Code) or Cursor for the best experience." />

      <div className='grid gap-6'>
        <InfoBox
          icon={<Icons.VSCode className='size-5 text-blue-600' />}
          title='Visual Studio Code'
        >
          <p>
            Visual Studio Code is a lightweight but powerful source code editor
            available for Windows, macOS, and Linux.
          </p>

          <InfoBox
            icon={<AlertTriangle className='size-5 text-amber-600' />}
            title='Version Requirement'
            variant='warning'
          >
            <p className='text-sm text-amber-700'>
              Superflex requires VS Code v1.70.0 or higher. If you already have
              VS Code installed, check your version via{' '}
              <span className='font-medium'>Help &gt; About</span> and update if
              needed.
            </p>
          </InfoBox>

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
        </InfoBox>

        <InfoBox
          icon={<Icons.Cursor className='size-5 text-purple-600' />}
          title='Cursor'
        >
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
        </InfoBox>
      </div>

      <SectionFooter
        message="Once installed, you're ready to proceed to the next step! 🚀"
        sectionId='download-vscode'
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    </OnboardingSection>
  )
}
