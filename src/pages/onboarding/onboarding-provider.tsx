import {
  useOnboardingStep,
  useUpdateOnboardingStep,
  useUser
} from '@/lib/hooks'
import type { OnboardingSection } from '@/lib/types'
import { onboardingStepMapping } from '@/lib/utils'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const OnboardingContext = createContext<
  | {
      sections: OnboardingSection[]
      openSection: string
      setOpenSection: (value: string) => void
      markSectionCompleted: (sectionId: string, isCompleted: boolean) => void
      disabledSections: string[]
      completeStepNumber: number
    }
  | undefined
>(undefined)

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useUser()
  const { currentStep, isStepCompleted } = useOnboardingStep()
  const updateOnboardingStep = useUpdateOnboardingStep()

  const completeStepNumber = useMemo(() => {
    return onboardingStepMapping.steps.length - 1
  }, [])

  useEffect(() => {
    if (user && user.onboarding_step === null) {
      updateOnboardingStep.mutate(completeStepNumber)
    }
  }, [user, completeStepNumber, updateOnboardingStep])

  const [sections, setSections] = useState<OnboardingSection[]>(() => [
    {
      id: 'download-vscode',
      title: 'Install VS Code or Cursor',
      defaultOpen: currentStep === 2,
      completed: isStepCompleted(2),
      stepNumber: 2
    },
    {
      id: 'start-using-superflex',
      title: 'Start using Superflex',
      defaultOpen: currentStep === 3,
      completed: isStepCompleted(3),
      stepNumber: 3
    },
    {
      id: 'connect-figma',
      title: 'Connect your Figma account',
      defaultOpen: currentStep === 4,
      completed: isStepCompleted(4),
      stepNumber: 4
    }
  ])

  const currentStepSlug = useMemo(() => {
    if (user && (user.onboarding_step ?? 0) > 4) {
      return 'connect-figma'
    }
    if (currentStep === 4) {
      return 'connect-figma'
    }
    if (currentStep === 3) {
      return 'start-using-superflex'
    }
    return 'download-vscode'
  }, [user, currentStep, user?.onboarding_step])

  const [openSection, setOpenSection] = useState<string>(currentStepSlug)

  useEffect(() => {
    setOpenSection(currentStepSlug)
  }, [currentStepSlug])

  useEffect(() => {
    if (user) {
      setSections(prev =>
        prev.map(section => ({
          ...section,
          completed: section.stepNumber < (user.onboarding_step ?? 0)
        }))
      )
    }
  }, [user])

  const markSectionCompleted = useCallback(
    (sectionId: string, isCompleted: boolean) => {
      setSections(prev => {
        const updatedSections = prev.map(section =>
          section.id === sectionId
            ? { ...section, completed: isCompleted }
            : section
        )

        const currentIndex = prev.findIndex(section => section.id === sectionId)
        const currentSection = prev[currentIndex]
        const isLastSection = currentIndex === prev.length - 1

        if (isCompleted && currentSection) {
          const nextStepNumber = currentSection.stepNumber + 1
          updateOnboardingStep.mutate(nextStepNumber)

          if (!isLastSection) {
            const nextSectionIndex = currentIndex + 1
            const nextSectionId = prev[nextSectionIndex].id

            setTimeout(() => {
              setOpenSection(nextSectionId)
            }, 0)
          }
        }

        return updatedSections
      })
    },
    [updateOnboardingStep]
  )

  const disabledSections = useMemo(() => {
    const result: string[] = []

    for (let i = 1; i < sections.length; i++) {
      const previousSectionsCompleted = sections
        .slice(0, i)
        .every(section => section.completed)

      if (!previousSectionsCompleted) {
        result.push(sections[i].id)
      }
    }

    return result
  }, [sections])

  const value = useMemo(
    () => ({
      sections,
      openSection,
      setOpenSection,
      markSectionCompleted,
      disabledSections,
      completeStepNumber
    }),
    [
      sections,
      openSection,
      markSectionCompleted,
      disabledSections,
      completeStepNumber
    ]
  )

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within an OnboardingProvider'
    )
  }
  return context
}
