import type { Editor } from '@/lib/types'
import { InfoBox } from '@/shared/onboarding-components/info-box'
import { StepList } from '@/shared/onboarding-components/step-list'
import { Icons } from '@/ui/icons'
import { memo, useMemo } from 'react'

export const InstallationSteps = memo(
  ({
    editor
  }: {
    editor: Editor
  }) => {
    const steps = useMemo(
      () => [
        {
          id: `${editor}-step-1`,
          text: `Open ${editor === 'vscode' ? 'VS Code' : 'Cursor'}`
        },
        {
          id: `${editor}-step-2`,
          text: `Click on the Extensions tab (${editor === 'vscode' ? 'Ctrl + Shift + X / Cmd + Shift + X' : 'Ctrl + Shift + X / Cmd + Shift + X'})`
        },
        { id: `${editor}-step-3`, text: 'Search for Superflex' },
        { id: `${editor}-step-4`, text: 'Click Install' }
      ],
      [editor]
    )

    return (
      <InfoBox
        icon={
          editor === 'vscode' ? (
            <Icons.VSCode className='size-5 text-blue-600' />
          ) : (
            <Icons.Cursor className='size-5 text-purple-600' />
          )
        }
        title={`Installing Superflex in ${editor === 'vscode' ? 'VS Code' : 'Cursor'}`}
      >
        <StepList steps={steps} />
      </InfoBox>
    )
  }
)
