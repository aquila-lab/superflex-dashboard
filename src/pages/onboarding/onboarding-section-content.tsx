import { useNavigate } from 'react-router-dom'
import { ConnectFigmaSection } from './connect-figma-section'
import { DownloadVSCodeSection } from './download-vscode-section'
import { StartUsingSection } from './start-using-section'

export const OnboardingSectionContent = ({
  sectionId,
  completed,
  onComplete
}: {
  sectionId: string
  completed: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  const navigate = useNavigate()

  if (sectionId === 'download-vscode') {
    return (
      <DownloadVSCodeSection
        isCompleted={completed}
        onComplete={onComplete}
      />
    )
  }

  if (sectionId === 'start-using-superflex') {
    return (
      <StartUsingSection
        isCompleted={completed}
        onComplete={onComplete}
      />
    )
  }

  if (sectionId === 'connect-figma') {
    return (
      <ConnectFigmaSection
        isCompleted={completed}
        onComplete={() => {
          onComplete(sectionId, true)
          navigate('/dashboard')
        }}
      />
    )
  }

  return null
}
