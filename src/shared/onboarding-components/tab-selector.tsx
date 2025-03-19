import type { TabOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import { memo, useCallback } from 'react'

export const TabSelector = memo(
  ({
    tabs,
    activeTab,
    onTabChange
  }: {
    tabs: TabOption[]
    activeTab: string
    onTabChange: (tabId: string) => void
  }) => {
    const handleTabClick = useCallback(
      (tabId: string) => {
        onTabChange(tabId)
      },
      [onTabChange]
    )

    return (
      <div className='flex space-x-2 border-b'>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type='button'
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'px-4 py-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2',
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    )
  }
)
