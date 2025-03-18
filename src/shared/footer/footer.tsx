import { Separator } from '@/ui/separator'
import { useMemo } from 'react'
import { GitHubButton } from '../github-button/github-button'
import { FooterCopyright } from './footer-copyright'
import { FooterHelp } from './footer-help'
import { FooterLegal } from './footer-legal'
import { FooterResources } from './footer-resources'
import { FooterSocial } from './footer-social'

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className='w-full py-6 bg-background border-t'>
      <div className='container mx-auto max-w-6xl px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 py-8'>
          <FooterResources />
          <FooterHelp />
          <FooterLegal />
          <FooterSocial />
        </div>

        <Separator className='my-6' />

        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <FooterCopyright year={currentYear} />
          <div className='flex items-center gap-2'>
            <GitHubButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
