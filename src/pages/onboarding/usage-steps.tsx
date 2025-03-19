import type { Editor } from '@/lib/types'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { StepList } from '@/shared/onboarding-components/step-list'
import { Rocket } from 'lucide-react'
import { useMemo } from 'react'

import { memo } from 'react'

export const UsageSteps = memo(
  ({
    editor
  }: {
    editor: Editor
  }) => {
    const steps = useMemo(
      () => [
        {
          id: `${editor}-usage-1`,
          text: `Open your project in ${editor === 'vscode' ? 'VS Code' : 'Cursor'}`
        },
        {
          id: `${editor}-usage-2`,
          text: `Access Superflex from the sidebar or press ${
            editor === 'vscode' ? '(Ctrl + ; / Cmd + ;)' : '⌘;'
          } to open Superflex`
        },
        {
          id: `${editor}-usage-3`,
          text: 'Move Superflex to the secondary sidebar for better multitasking'
        },
        { id: `${editor}-usage-4`, text: 'Start coding at superhuman speed!' }
      ],
      [editor]
    )

    return (
      <InfoBox
        icon={<Rocket className='size-5 text-red-300' />}
        title='Using Superflex'
      >
        <StepList steps={steps} />
      </InfoBox>
    )
  }
)
