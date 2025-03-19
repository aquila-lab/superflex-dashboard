import { OnboardingSection } from '@/shared/onboarding-components/onboarding-section'
import { SectionFooter } from '@/shared/onboarding-components/section-footer'
import { SectionIntro } from '@/shared/onboarding-components/section-intro'
import { Icons } from '@/ui/icons'
import { useMemo } from 'react'
import { EditorOption } from './editor-option'
import { VersionRequirement } from './version-requirement'

export const DownloadVSCodeSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const editorOptions = useMemo(
    () => [
      {
        icon: <Icons.VSCode className='size-5 text-blue-600' />,
        title: 'Visual Studio Code',
        description:
          'Visual Studio Code is a lightweight but powerful source code editor available for Windows, macOS, and Linux.',
        downloadUrl: 'https://code.visualstudio.com/download',
        hasVersionRequirement: true
      },
      {
        icon: <Icons.Cursor className='size-5 text-purple-600' />,
        title: 'Cursor',
        description:
          'Cursor is an AI-enhanced version of VS Code, optimized for AI-assisted development with built-in AI capabilities for code generation, explanation, and debugging.',
        downloadUrl: 'https://cursor.sh',
        hasVersionRequirement: false
      }
    ],
    []
  )

  return (
    <OnboardingSection>
      <SectionIntro text="To start using Superflex, you'll need a code editor that supports its features. We recommend using Visual Studio Code (VS Code) or Cursor for the best experience." />

      <div className='grid gap-6'>
        {editorOptions.map(option => (
          <EditorOption
            key={option.title}
            icon={option.icon}
            title={option.title}
            description={option.description}
            downloadUrl={option.downloadUrl}
          >
            {option.hasVersionRequirement && <VersionRequirement />}
          </EditorOption>
        ))}
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
