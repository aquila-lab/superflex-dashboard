import type { Editor } from '@/lib/types'
import { cn } from '@/lib/utils'
import { YouTubeVideo } from '@/shared/youtube-video/youtube-video'
import { memo } from 'react'
import { InstallationSteps } from './installation-steps'
import { UsageSteps } from './usage-steps'

export const EditorContentTab = memo(
  ({
    editor,
    videoId
  }: {
    editor: Editor
    videoId: string
  }) => {
    return (
      <div className={cn('space-y-6')}>
        <YouTubeVideo videoId={videoId} />
        <InstallationSteps editor={editor} />
        <UsageSteps editor={editor} />
      </div>
    )
  }
)
