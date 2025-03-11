import { AppHeader } from '@/shared/app-header'
import { AppFooter } from '@/shared/app-footer'
import { cn, onboardingStepMapping } from '@/lib/utils'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { Check, Download, ExternalLink, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/ui/accordion'
import { API_BASE_URL } from '@/store/model'
import { useAuthStore } from '@/store/auth-store'
import { useUserStore } from '@/store/user-store'
import { useOnboardingStep } from '@/global/hooks/use-onboarding-step'
import { toast } from 'sonner'

type OnboardingSection = {
  id: string
  title: string
  defaultOpen: boolean
  completed: boolean
  stepNumber: number
}

const CompleteButton = ({
  sectionId,
  onComplete,
  isCompleted
}: {
  sectionId: string
  onComplete: (id: string, completed: boolean) => void
  isCompleted: boolean
}) => {
  if (isCompleted) {
    return (
      <div className='flex items-center text-green-600 gap-2'>
        <CheckCircle className='h-5 w-5' />
        <span className='text-sm font-medium'>Completed</span>
      </div>
    )
  }

  return (
    <Button
      variant='outline'
      onClick={() => onComplete(sectionId, true)}
    >
      <CheckCircle className='h-4 w-4 mr-2' />
      Mark as complete
    </Button>
  )
}

const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-wrap items-center gap-4 mt-6'>{children}</div>
  )
}

export const OnboardingPage = () => {
  const { user, updateUser } = useUserStore()
  const { getAuthHeader } = useAuthStore()
  const { currentStep, isStepCompleted } = useOnboardingStep()

  const completeStepNumber = useMemo(() => {
    return onboardingStepMapping.stepToNumber('complete')
  }, [])

  const updateOnboardingStep = useCallback(
    async (stepNumber: number) => {
      try {
        const response = await fetch(`${API_BASE_URL}/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify({
            onboarding_step: stepNumber
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to update progress')
        }

        updateUser({ onboarding_step: stepNumber })
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to update your progress'
        )
      }
    },
    [getAuthHeader, updateUser]
  )

  useEffect(() => {
    if (user && user.onboarding_step === null) {
      updateOnboardingStep(completeStepNumber)
    }
  }, [user, completeStepNumber, updateOnboardingStep])

  const [sections, setSections] = useState<OnboardingSection[]>([
    {
      id: 'download-vscode',
      title: 'Download VSCode',
      defaultOpen: currentStep === 'vscode-download',
      completed: isStepCompleted('vscode-download'),
      stepNumber: 2
    },
    {
      id: 'start-using-superflex',
      title: 'Start using Superflex',
      defaultOpen: currentStep === 'extension-installation',
      completed: isStepCompleted('extension-installation'),
      stepNumber: 3
    },
    {
      id: 'connect-figma',
      title: 'Connect your Figma account',
      defaultOpen: currentStep === 'connect-figma',
      completed: isStepCompleted('connect-figma'),
      stepNumber: 4
    }
  ])

  const [openSection, setOpenSection] = useState<string>(() => {
    if (user && (user.onboarding_step ?? 0) > 4) {
      return 'connect-figma'
    }
    if (currentStep === 'connect-figma') {
      return 'connect-figma'
    }
    if (currentStep === 'extension-installation') {
      return 'start-using-superflex'
    }
    return 'download-vscode'
  })

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

        if (isCompleted) {
          if (currentSection) {
            const nextStepNumber = currentSection.stepNumber + 1
            updateOnboardingStep(nextStepNumber)
          }

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
    [sections]
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

  return (
    <div className='flex flex-col min-h-svh'>
      <AppHeader />
      <div className='flex flex-col items-center justify-start p-4 max-w-4xl mx-auto w-full gap-8 pt-8 pb-12'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-2'>Setup Superflex</h1>
          <p className='text-muted-foreground max-w-2xl'>
            Follow these steps to get started with Superflex and supercharge
            your development workflow.
          </p>
        </div>

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
              <AccordionItem
                key={section.id}
                value={section.id}
                className={cn(
                  'px-6 py-2 last:pb-12 rounded-xl border-none',
                  isDisabled && 'opacity-70'
                )}
              >
                <div className='flex items-start gap-6'>
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                      section.completed
                        ? 'bg-green-100 border-green-500 text-green-600'
                        : isDisabled
                          ? 'bg-muted border-muted-foreground/40 text-muted-foreground'
                          : 'border-primary/40'
                    )}
                  >
                    {section.completed ? (
                      <Check className='h-5 w-5' />
                    ) : isDisabled ? (
                      <Lock className='h-4 w-4' />
                    ) : (
                      <span className='text-base font-medium'>{index + 1}</span>
                    )}
                  </div>
                  <div className='flex-1'>
                    <AccordionTrigger
                      className={cn(
                        '!p-0 hover:no-underline font-semibold text-xl flex items-center h-8 cursor-pointer leading-none',
                        isDisabled && 'cursor-not-allowed',
                        openSection === section.id &&
                          'cursor-default [&>svg]:opacity-50'
                      )}
                      disabled={isDisabled}
                    >
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className='pt-6'>
                      {section.id === 'download-vscode' && (
                        <OnboardingDownloadVSCode
                          onComplete={() =>
                            markSectionCompleted('download-vscode', true)
                          }
                          isCompleted={section.completed}
                          markAsComplete={() =>
                            markSectionCompleted('download-vscode', true)
                          }
                        />
                      )}
                      {section.id === 'start-using-superflex' && (
                        <OnboardingStartUsingSuperflex
                          onComplete={() =>
                            markSectionCompleted('start-using-superflex', true)
                          }
                          isCompleted={section.completed}
                          markAsComplete={() =>
                            markSectionCompleted('start-using-superflex', true)
                          }
                        />
                      )}
                      {section.id === 'connect-figma' && (
                        <OnboardingConnectFigma
                          onComplete={() =>
                            markSectionCompleted('connect-figma', true)
                          }
                          isCompleted={section.completed}
                          markAsComplete={() =>
                            markSectionCompleted('connect-figma', true)
                          }
                        />
                      )}
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
      <AppFooter />
    </div>
  )
}

const YouTubeVideo = ({ videoId }: { videoId: string }) => {
  return (
    <div className='aspect-video w-full rounded-xl overflow-hidden bg-muted'>
      <iframe
        className='w-full h-full'
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&disablekb=1&modestbranding=1&loop=1&playsinline=1&iv_load_policy=3&color=white`}
        title='YouTube video'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  )
}

const OnboardingDownloadVSCode = ({
  isCompleted,
  markAsComplete
}: {
  onComplete: () => void
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  return (
    <div className='space-y-6'>
      <YouTubeVideo videoId='KMxo3T_MTvY' />
      <div className='space-y-4 text-base'>
        <p>
          Visual Studio Code is a lightweight but powerful source code editor
          that runs on your desktop and is available for Windows, macOS, and
          Linux.
        </p>
        <p>
          VS Code comes with built-in support for JavaScript, TypeScript, and
          Node.js and has a rich ecosystem of extensions for other languages and
          frameworks.
        </p>
      </div>
      <ButtonGroup>
        <Button asChild>
          <a
            href='https://code.visualstudio.com/download'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Download className='mr-2 h-4 w-4' />
            Download VS Code
          </a>
        </Button>
        <CompleteButton
          sectionId='download-vscode'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </ButtonGroup>
    </div>
  )
}

const OnboardingStartUsingSuperflex = ({
  isCompleted,
  markAsComplete
}: {
  onComplete: () => void
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  return (
    <div className='space-y-6'>
      <YouTubeVideo videoId='KMxo3T_MTvY' />
      <div className='space-y-4 text-base'>
        <p>Follow these steps to install and set up Superflex in VS Code:</p>
        <ol className='list-decimal pl-5 space-y-4'>
          <li>Open your project in VSCode.</li>
          <li>
            Access Superflex from the sidebar or press{' '}
            <kbd className='px-2 py-1 bg-muted rounded text-xs'>⌘;</kbd> to open
            Superflex.
          </li>
          <li>
            Move Superflex to the secondary sidebar for better multitasking.
          </li>
          <li>Start coding at superhuman speed!</li>
        </ol>
      </div>
      <ButtonGroup>
        <Button asChild>
          <a
            href='https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex'
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink className='mr-2 h-4 w-4' />
            Superflex on VS Code Marketplace
          </a>
        </Button>
        <CompleteButton
          sectionId='start-using-superflex'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </ButtonGroup>
    </div>
  )
}

const OnboardingConnectFigma = ({
  isCompleted,
  markAsComplete
}: {
  onComplete: () => void
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  return (
    <div className='space-y-6'>
      <YouTubeVideo videoId='KMxo3T_MTvY' />
      <div className='space-y-4 text-base'>
        <p>
          Connect your Figma account to Superflex to supercharge your
          design-to-code workflow:
        </p>
        <ol className='list-decimal pl-5 space-y-4'>
          <li>Click on "Connect Figma" in the lower panel</li>
          <li>
            When the new tab opens, click Allow to allow Superflex to read your
            Figma project
          </li>
          <li>
            Now you will be able to copy Figma selections and give them as
            context to Superflex using the Figma link feature
          </li>
        </ol>
      </div>
      <ButtonGroup>
        <CompleteButton
          sectionId='connect-figma'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </ButtonGroup>
    </div>
  )
}
