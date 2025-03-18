import { FooterLink } from './footer-link'
import { FooterLinkGroup } from './footer-link-group'

export const FooterLegal = () => {
  return (
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
  )
}
