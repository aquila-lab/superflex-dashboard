import { Accordion } from '@/ui/accordion'
import { useCallback, useEffect, useRef } from 'react'
import { OnboardingAccordionItem } from './onboarding-accordion-item'
import { useOnboardingContext } from './onboarding-provider'
import { useOnboardingStep } from '@/lib/hooks'

export const OnboardingForm = () => {
  const {
    sections,
    openSection,
    setOpenSection,
    markSectionCompleted,
    disabledSections
  } = useOnboardingContext()

  const { isComplete } = useOnboardingStep()

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const prevOpenSectionRef = useRef<string | null>(null)
  const isInitialRender = useRef(true)

  const handleAccordionValueChange = useCallback(
    (value: string) => {
      if (value === '' || isComplete) {
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
    [sections, setOpenSection, isComplete]
  )

  const handleSectionComplete = useCallback(
    (id: string, completed: boolean) => {
      markSectionCompleted(id, completed)
    },
    [markSectionCompleted]
  )

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      prevOpenSectionRef.current = openSection
      return
    }

    if (openSection && openSection !== prevOpenSectionRef.current) {
      setTimeout(() => {
        if (sectionRefs.current[openSection]) {
          sectionRefs.current[openSection]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)

      prevOpenSectionRef.current = openSection
    }
  }, [openSection])

  const getSectionRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      sectionRefs.current[id] = node
    },
    []
  )

  return (
    <Accordion
      type='single'
      value={isComplete ? '' : openSection}
      onValueChange={handleAccordionValueChange}
      className='w-full'
      collapsible
    >
      {sections.map((section, index) => {
        const isDisabled = isComplete || disabledSections.includes(section.id)

        return (
          <div
            key={section.id}
            ref={getSectionRef(section.id)}
          >
            <OnboardingAccordionItem
              section={section}
              index={index}
              disabled={isDisabled}
              isOpen={!isComplete && openSection === section.id}
              onComplete={handleSectionComplete}
            />
          </div>
        )
      })}
    </Accordion>
  )
}
