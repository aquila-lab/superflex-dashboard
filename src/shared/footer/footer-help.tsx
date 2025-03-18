import { Mail } from 'lucide-react'
import { FooterLink } from './footer-link'
import { FooterLinkGroup } from './footer-link-group'

export const FooterHelp = () => {
  return (
    <FooterLinkGroup title='Help'>
      <FooterLink
        href='/dashboard/onboarding'
        label='Setup Superflex'
      />
      <FooterLink
        href='https://forms.gle/aUZjzeUzLnrmJvdR7'
        label='Leave Feedback'
        isExternal
      />
      <a
        href='mailto:boris@superflex.ai'
        className='text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1'
      >
        <span>Support</span>
        <Mail className='size-3' />
      </a>
    </FooterLinkGroup>
  )
}
