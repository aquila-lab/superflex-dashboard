import { cn } from '@/lib/utils'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/ui/accordion'
import type { useOnboardingContext } from './onboarding-provider'
import { OnboardingSectionContent } from './onboarding-section-content'
import { OnboardingSectionIcon } from './onboarding-section-icon'

export const OnboardingAccordionItem = ({
  section,
  index,
  disabled,
  isOpen,
  onComplete
}: {
  section: ReturnType<typeof useOnboardingContext>['sections'][number]
  index: number
  disabled: boolean
  isOpen: boolean
  onComplete: (id: string, completed: boolean) => void
}) => {
  return (
    <AccordionItem
      value={section.id}
      className={cn(
        'px-6 py-2 last:pb-12 rounded-xl border-none',
        disabled && 'opacity-70'
      )}
    >
      <div className='flex items-start gap-6'>
        <OnboardingSectionIcon
          completed={section.completed}
          disabled={disabled}
          index={index}
        />
        <div className='flex-1'>
          <AccordionTrigger
            className={cn(
              '!p-0 hover:no-underline font-semibold text-xl flex items-center h-8 cursor-pointer leading-none',
              disabled && 'cursor-not-allowed',
              isOpen && 'cursor-default [&>svg]:opacity-50'
            )}
            disabled={disabled}
          >
            {section.title}
          </AccordionTrigger>
          <AccordionContent className='pt-6'>
            <OnboardingSectionContent
              sectionId={section.id}
              completed={section.completed}
              onComplete={onComplete}
            />
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  )
}
