import type { Editor, TabOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import { OnboardingSection } from '@/shared/onboarding-components/onboarding-section'
import { SectionFooter } from '@/shared/onboarding-components/section-footer'
import { SectionIntro } from '@/shared/onboarding-components/section-intro'
import { TabSelector } from '@/shared/onboarding-components/tab-selector'
import { Icons } from '@/ui/icons'
import { useState, useCallback, useMemo } from 'react'
import { EditorContentTab } from './editor-content-tab'
import { QuickInstallOptions } from './quick-install-options'

export const StartUsingSection = ({
  isCompleted,
  onComplete
}: {
  isCompleted: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const [activeTab, setActiveTab] = useState<Editor>('vscode')

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as Editor)
  }, [])

  const tabOptions = useMemo(
    (): TabOption[] => [
      {
        id: 'vscode',
        label: 'VS Code',
        icon: <Icons.VSCode className='size-4' />
      },
      {
        id: 'cursor',
        label: 'Cursor',
        icon: <Icons.Cursor className='size-4' />
      }
    ],
    []
  )

  return (
    <OnboardingSection>
      <SectionIntro text="Now that you have VS Code or Cursor installed, it's time to set up Superflex. Follow the instructions below based on your editor of choice." />

      <TabSelector
        tabs={tabOptions}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className={cn(activeTab !== 'vscode' && 'hidden')}>
        <EditorContentTab
          editor='vscode'
          videoId='wB7Um6n9bBA'
        />
      </div>

      <div className={cn(activeTab !== 'cursor' && 'hidden')}>
        <EditorContentTab
          editor='cursor'
          videoId='pM3YPWC_4Oo'
        />
      </div>

      <QuickInstallOptions />

      <SectionFooter
        message="Once installed, you're ready for the next step! 🚀"
        sectionId='start-using-superflex'
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    </OnboardingSection>
  )
}
