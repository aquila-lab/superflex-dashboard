import { InfoBox } from '@/shared/onboarding-components/info-box'
import { Button } from '@/ui/button'
import { Download } from 'lucide-react'
import type { ReactNode } from 'react'

export const EditorOption = ({
  icon,
  title,
  description,
  downloadUrl,
  children
}: {
  icon: ReactNode
  title: string
  description: string
  downloadUrl: string
  children?: ReactNode
}) => {
  return (
    <InfoBox
      icon={icon}
      title={title}
    >
      <p>{description}</p>

      {children}

      <Button
        asChild
        variant='outline'
        className='mt-2'
      >
        <a
          href={downloadUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Download className='mr-2 size-4' />
          Download {title}
        </a>
      </Button>
    </InfoBox>
  )
}
