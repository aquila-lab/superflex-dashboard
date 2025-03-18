import { ExternalLink } from 'lucide-react'

export const FooterLink = ({
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
      {isExternal && <ExternalLink className='size-3' />}
    </a>
  )
}
