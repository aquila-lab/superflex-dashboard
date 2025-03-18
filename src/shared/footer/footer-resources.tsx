import { FooterLink } from './footer-link'
import { FooterLinkGroup } from './footer-link-group'

export const FooterResources = () => {
  return (
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
  )
}
