import { Accordion } from '@/ui/accordion'
import { useCallback } from 'react'
import { OnboardingAccordionItem } from './onboarding-accordion-item'
import { useOnboardingContext } from './onboarding-provider'

export const OnboardingForm = () => {
  const {
    sections,
    openSection,
    setOpenSection,
    markSectionCompleted,
    disabledSections
  } = useOnboardingContext()

  const handleAccordionValueChange = useCallback(
    (value: string) => {
      if (value === '') {
        return
      }

      const sectionIndex = sections.findIndex(section => section.id === value)
      if (sectionIndex > 0) {
        const previousSectionsCompleted = sections
          .slice(0, sectionIndex)
          .every(section => section.completed)

        if (!previousSectionsCompleted) {
          return
        }
      }

      setOpenSection(value)
    },
    [sections, setOpenSection]
  )

  const handleSectionComplete = useCallback(
    (id: string, completed: boolean) => {
      markSectionCompleted(id, completed)
    },
    [markSectionCompleted]
  )

  return (
    <Accordion
      type='single'
      value={openSection}
      onValueChange={handleAccordionValueChange}
      className='w-full space-y-8'
      collapsible
    >
      {sections.map((section, index) => {
        const isDisabled = disabledSections.includes(section.id)

        return (
          <OnboardingAccordionItem
            key={section.id}
            section={section}
            index={index}
            disabled={isDisabled}
            isOpen={openSection === section.id}
            onComplete={handleSectionComplete}
          />
        )
      })}
    </Accordion>
  )
}
