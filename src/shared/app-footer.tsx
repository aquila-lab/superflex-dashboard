import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip'
import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Star,
  Twitter
} from 'lucide-react'
import { useMemo } from 'react'

const SocialIcon = ({
  href,
  icon: Icon,
  label,
  className
}: {
  href: string
  icon: React.ElementType
  label: string
  className?: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-primary transition-colors',
              className
            )}
            aria-label={label}
          >
            <Icon className='h-4 w-4' />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const FooterLink = ({
  href,
  label,
  isExternal = false
}: {
  href: string
  label: string
  isExternal?: boolean
}) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1'
    >
      {label}
      {isExternal && <ExternalLink className='h-3 w-3' />}
    </a>
  )
}

const FooterLinkGroup = ({
  title,
  children
}: { title: string; children: React.ReactNode }) => {
  return (
    <div className='space-y-2'>
      <h4 className='text-sm font-medium'>{title}</h4>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  )
}

export const AppFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className='w-full py-6 bg-background border-t'>
      <div className='container mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 py-8'>
          <FooterLinkGroup title='Resources'>
            <FooterLink
              href='https://www.superflex.ai/#features'
              label='Solutions'
              isExternal
            />
            <FooterLink
              href='https://www.superflex.ai/#pricing'
              label='Pricing'
              isExternal
            />
            <FooterLink
              href='https://www.superflex.ai/blog'
              label='Blog'
              isExternal
            />
            <FooterLink
              href='https://marketplace.visualstudio.com/items?itemName=aquilalabs.superflex'
              label='VSCode Extension'
              isExternal
            />
          </FooterLinkGroup>

          <FooterLinkGroup title='Help'>
            <FooterLink
              href='/dashboard/onboarding'
              label='Setup Superflex'
            />
            <a
              href='mailto:boris@superflex.ai'
              className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1'
            >
              <Mail className='h-3 w-3' />
              <span>Support</span>
            </a>
          </FooterLinkGroup>

          <FooterLinkGroup title='Legal'>
            <FooterLink
              href='https://www.superflex.ai/terms-of-service'
              label='Terms of Service'
              isExternal
            />
            <FooterLink
              href='https://www.superflex.ai/privacy'
              label='Privacy Policy'
              isExternal
            />
          </FooterLinkGroup>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Superflex</h3>
            <p className='text-sm text-muted-foreground'>
              Supercharge your development workflow with AI-powered tools.
            </p>
            <div className='flex items-center gap-2'>
              <SocialIcon
                href='https://x.com/superflex_ai'
                icon={Twitter}
                label='Follow on Twitter'
              />
              <SocialIcon
                href='https://www.linkedin.com/company/superflex-ai/'
                icon={Linkedin}
                label='Follow on LinkedIn'
              />
              <SocialIcon
                href='https://www.tiktok.com/@superflex.ai'
                icon={() => (
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M19.321 5.562C18.0655 4.2008 17.3451 2.4446 17.3132 0.608C17.3132 0.271 17.0423 0 16.7053 0H12.5347C12.1977 0 11.9268 0.271 11.9268 0.608V16.5062C11.9268 18.289 10.482 19.7337 8.69931 19.7337C6.91661 19.7337 5.47179 18.289 5.47179 16.5062C5.47179 14.7235 6.91661 13.2788 8.69931 13.2788C9.0363 13.2788 9.30721 13.0078 9.30721 12.6708V8.77366C9.30721 8.43667 9.0363 8.16576 8.69931 8.16576C3.89196 8.16576 0 12.0584 0 16.8657C0 21.6729 3.89196 25.5649 8.69931 25.5649C13.5066 25.5649 17.3986 21.6729 17.3986 16.8657V8.28208C18.8917 9.37073 20.6665 9.95117 22.4968 9.95177C22.8338 9.95177 23.1047 9.68086 23.1047 9.34387V5.44677C23.1047 5.10978 22.8338 4.83887 22.4968 4.83887C21.3789 4.83887 20.2814 4.36599 19.4327 3.51731L19.321 5.562Z'
                      fill='currentColor'
                    />
                  </svg>
                )}
                label='Follow on TikTok'
              />
              <SocialIcon
                href='https://www.instagram.com/superflex.ai/'
                icon={Instagram}
                label='Follow on Instagram'
              />
              <SocialIcon
                href='https://github.com/aquila-lab/superflex-vscode'
                icon={Github}
                label='Star on GitHub'
                className='flex items-center gap-1'
              />
            </div>
          </div>
        </div>

        <Separator className='my-6' />

        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            Aquila Labs, Inc. All rights reserved. © {currentYear}
          </p>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 gap-2'
              asChild
            >
              <a
                href='https://github.com/aquila-lab/superflex-vscode'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Star className='h-3.5 w-3.5' />
                <span>Star on GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
