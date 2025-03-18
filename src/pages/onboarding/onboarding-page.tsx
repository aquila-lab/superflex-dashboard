import {
  useExtensionLauncher,
  useOnboardingStep,
  useUpdateOnboardingStep,
  useUser
} from '@/lib/hooks'
import type { OnboardingSection } from '@/lib/types'
import { cn, onboardingStepMapping } from '@/lib/utils'
import { DashboardHeader } from '@/shared/dashboard-header/dashboard-header'
import { Footer } from '@/shared/footer/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/ui/accordion'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Download,
  ExternalLink,
  Lock,
  Rocket,
  Sparkles,
  Zap
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <CheckCircle className='size-5' />
        <span className='text-sm font-medium'>Completed</span>
      </div>
    )
  }

  return (
    <Button
      variant='outline'
      onClick={() => onComplete(sectionId, true)}
    >
      <CheckCircle className='size-4 mr-2' />
      Mark as complete
    </Button>
  )
}

export const OnboardingPage = () => {
  const navigate = useNavigate()
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

  const [sections, setSections] = useState<OnboardingSection[]>([
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

  const [openSection, setOpenSection] = useState<string>(() => {
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
      <DashboardHeader />
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
                        ? 'bg-green-200 border-green-600 text-green-700'
                        : isDisabled
                          ? 'bg-muted border-muted-foreground/40 text-muted-foreground'
                          : 'border-primary/40'
                    )}
                  >
                    {section.completed ? (
                      <Check className='size-5' />
                    ) : isDisabled ? (
                      <Lock className='size-4' />
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
                          isCompleted={section.completed}
                          markAsComplete={() =>
                            markSectionCompleted('download-vscode', true)
                          }
                        />
                      )}
                      {section.id === 'start-using-superflex' && (
                        <OnboardingStartUsingSuperflex
                          isCompleted={section.completed}
                          markAsComplete={() =>
                            markSectionCompleted('start-using-superflex', true)
                          }
                        />
                      )}
                      {section.id === 'connect-figma' && (
                        <OnboardingConnectFigma
                          isCompleted={section.completed}
                          markAsComplete={() => {
                            navigate('/dashboard')
                            markSectionCompleted('connect-figma', true)
                          }}
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
      <Footer />
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
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4 text-base'>
        <p>
          To start using Superflex, you'll need a code editor that supports its
          features. We recommend using Visual Studio Code (VS Code) or Cursor
          for the best experience.
        </p>
      </div>

      <div className='grid gap-6'>
        <div className='rounded-lg border p-4 space-y-3'>
          <div className='flex items-center gap-2 font-medium'>
            <Icons.VSCode className='size-5 text-blue-600' />
            <h3 className='text-lg'>Visual Studio Code</h3>
          </div>
          <p>
            Visual Studio Code is a lightweight but powerful source code editor
            available for Windows, macOS, and Linux.
          </p>
          <div className='rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-start gap-3'>
            <AlertTriangle className='size-5 text-amber-600 mt-0.5 flex-shrink-0' />
            <div>
              <p className='font-medium text-amber-800'>Version Requirement</p>
              <p className='text-sm text-amber-700'>
                Superflex requires VS Code v1.70.0 or higher. If you already
                have VS Code installed, check your version via{' '}
                <span className='font-medium'>Help &gt; About</span> and update
                if needed.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant='outline'
            className='mt-2'
          >
            <a
              href='https://code.visualstudio.com/download'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Download className='mr-2 size-4' />
              Download VS Code
            </a>
          </Button>
        </div>

        <div className='rounded-lg border p-4 space-y-3'>
          <div className='flex items-center gap-2 font-medium'>
            <Icons.Cursor className='size-5 text-purple-600' />
            <h3 className='text-lg'>Cursor</h3>
          </div>
          <p>
            Cursor is an AI-enhanced version of VS Code, optimized for
            AI-assisted development with built-in AI capabilities for code
            generation, explanation, and debugging.
          </p>
          <Button
            asChild
            variant='outline'
            className='mt-2'
          >
            <a
              href='https://cursor.sh'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Download className='mr-2 size-4' />
              Download Cursor
            </a>
          </Button>
        </div>
      </div>

      <div className='pt-2 flex justify-between items-center'>
        <p className='text-sm text-muted-foreground'>
          Once installed, you're ready to proceed to the next step! 🚀
        </p>
        <CompleteButton
          sectionId='download-vscode'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  )
}

const OnboardingStartUsingSuperflex = ({
  isCompleted,
  markAsComplete
}: {
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'vscode' | 'cursor'>('vscode')
  const {
    isAttemptingLaunch,
    currentApp,
    launchVSCodeExtension,
    launchCursorExtension,
    openMarketplace
  } = useExtensionLauncher()

  return (
    <div className='space-y-6'>
      <div className='space-y-4 text-base'>
        <p>
          Now that you have VS Code or Cursor installed, it's time to set up
          Superflex. Follow the instructions below based on your editor of
          choice.
        </p>
      </div>

      <div className='flex space-x-2 border-b'>
        <button
          type='button'
          onClick={() => setActiveTab('vscode')}
          className={cn(
            'px-4 py-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2',
            activeTab === 'vscode'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icons.VSCode className='size-4' />
          VS Code
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('cursor')}
          className={cn(
            'px-4 py-2 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2',
            activeTab === 'cursor'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icons.Cursor className='size-4' />
          Cursor
        </button>
      </div>

      <div className={cn('space-y-6', activeTab !== 'vscode' && 'hidden')}>
        <YouTubeVideo videoId='wB7Um6n9bBA' />
        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <Icons.VSCode className='size-5 text-blue-600' />
            <h3 className='text-lg'>Installing Superflex in VS Code</h3>
          </div>

          <div className='space-y-3 pl-2'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>1</span>
              </div>
              <p>Open VS Code</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>2</span>
              </div>
              <p>
                Click on the Extensions tab (
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Ctrl + Shift + X
                </kbd>{' '}
                /
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Cmd + Shift + X
                </kbd>
                )
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>3</span>
              </div>
              <p>
                Search for <span className='font-medium'>Superflex</span>
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>4</span>
              </div>
              <p>
                Click <span className='font-medium'>Install</span>
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <Rocket className='size-5 text-red-300' />
            <h3 className='text-lg'>Using Superflex</h3>
          </div>

          <div className='space-y-3 pl-2'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>1</span>
              </div>
              <p>Open your project in VS Code</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>2</span>
              </div>
              <p>
                Access Superflex from the sidebar or press (
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Ctrl + ;
                </kbd>{' '}
                /
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Cmd + ;
                </kbd>
                ) to open Superflex
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>3</span>
              </div>
              <p>
                Move Superflex to the secondary sidebar for better multitasking
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>4</span>
              </div>
              <p>Start coding at superhuman speed!</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('space-y-6', activeTab !== 'cursor' && 'hidden')}>
        <YouTubeVideo videoId='pM3YPWC_4Oo' />
        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <Icons.Cursor className='size-5 text-purple-600' />
            <h3 className='text-lg'>Installing Superflex in Cursor</h3>
          </div>

          <div className='space-y-3 pl-2'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>1</span>
              </div>
              <p>Open Cursor</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>2</span>
              </div>
              <p>
                Click on the Extensions tab (
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Ctrl + Shift + X
                </kbd>{' '}
                /
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>
                  Cmd + Shift + X
                </kbd>
                )
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>3</span>
              </div>
              <p>
                Search for <span className='font-medium'>Superflex</span>
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>4</span>
              </div>
              <p>
                Click <span className='font-medium'>Install</span>
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-lg border p-4 space-y-4'>
          <div className='flex items-center gap-2 font-medium'>
            <Rocket className='size-5 text-red-300' />
            <h3 className='text-lg'>Using Superflex</h3>
          </div>

          <div className='space-y-3 pl-2'>
            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>1</span>
              </div>
              <p>Open your project in Cursor</p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>2</span>
              </div>
              <p>
                Access Superflex from the sidebar or press{' '}
                <kbd className='px-1.5 py-0.5 bg-muted rounded text-xs'>⌘;</kbd>{' '}
                to open Superflex
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>3</span>
              </div>
              <p>
                Move Superflex to the secondary sidebar for better multitasking
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <span className='text-xs font-medium'>4</span>
              </div>
              <p>Start coding at superhuman speed!</p>
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-lg border p-4 space-y-4'>
        <div className='flex items-center gap-2 font-medium'>
          <Zap className='size-5 text-yellow-500' />
          <h3 className='text-lg'>Quick Install Options</h3>
        </div>
        <p>Use these options to install Superflex directly:</p>

        <div className='flex flex-wrap gap-3'>
          <Button
            variant='outline'
            onClick={launchVSCodeExtension}
            disabled={isAttemptingLaunch}
            className='flex items-center'
          >
            {isAttemptingLaunch && currentApp === 'VS Code' ? (
              <>
                <Icons.Spinner className='size-4 animate-spin' />
                <span>Launching...</span>
              </>
            ) : (
              <>
                <Icons.VSCode className='size-4 text-blue-600' />
                <span>Install in VS Code</span>
              </>
            )}
          </Button>

          <Button
            variant='outline'
            onClick={launchCursorExtension}
            disabled={isAttemptingLaunch}
            className='flex items-center'
          >
            {isAttemptingLaunch && currentApp === 'Cursor' ? (
              <>
                <Icons.Spinner className='size-4 animate-spin' />
                <span>Launching...</span>
              </>
            ) : (
              <>
                <Icons.Cursor className='size-4 text-purple-600' />
                <span>Install in Cursor</span>
              </>
            )}
          </Button>

          <Button
            variant='outline'
            onClick={openMarketplace}
          >
            <ExternalLink className='size-4' />
            <span>Visit VS Code Marketplace</span>
          </Button>
        </div>
      </div>

      <div className='pt-2 flex justify-between items-center'>
        <p className='text-sm text-muted-foreground'>
          Once installed, you're ready for the next step! 🚀
        </p>
        <CompleteButton
          sectionId='start-using-superflex'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  )
}

const OnboardingConnectFigma = ({
  isCompleted,
  markAsComplete
}: {
  isCompleted: boolean
  markAsComplete: () => void
}) => {
  return (
    <div className='space-y-6'>
      <div className='space-y-4 text-base'>
        <p>
          Before diving into Superflex, you need to connect your Figma account.
          This allows Superflex to access your designs and use them as context
          for AI-powered assistance.
        </p>
      </div>

      <YouTubeVideo videoId='9Xn9qisQRgM' />

      <div className='rounded-lg border p-4 space-y-4'>
        <div className='flex items-center gap-2 font-medium'>
          <CheckCircle className='size-5 text-green-600' />
          <h3 className='text-lg'>How to Connect Figma</h3>
        </div>

        <div className='space-y-3 pl-2'>
          <div className='flex items-center gap-3'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <span className='text-xs font-medium'>1</span>
            </div>
            <p>
              Click <span className='font-medium'>"Connect Figma"</span> in the
              lower panel of Superflex.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <span className='text-xs font-medium'>2</span>
            </div>
            <p>
              A new tab will open—click{' '}
              <span className='font-medium'>Allow</span> to grant Superflex
              permission to read your Figma projects.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary'>
              <span className='text-xs font-medium'>3</span>
            </div>
            <p>
              Once connected, you'll be able to copy Figma selections and use
              the Figma link feature to provide design context directly to
              Superflex.
            </p>
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-green-50 border border-green-200 p-4 space-y-1 flex items-start gap-3'>
        <Sparkles className='size-5 text-green-600 mt-0.5 flex-shrink-0' />
        <div>
          <p className='font-medium text-green-800'>What you'll unlock</p>
          <p className='text-sm text-green-700'>
            With Figma connected, you can convert designs directly to code, get
            layout suggestions, and ensure your implementation matches the
            design perfectly.
          </p>
        </div>
      </div>

      <div className='pt-2 flex justify-between items-center'>
        <p className='text-sm text-muted-foreground'>
          All set? Click the button to complete onboarding! 🚀
        </p>
        <CompleteButton
          sectionId='connect-figma'
          onComplete={() => markAsComplete()}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  )
}
