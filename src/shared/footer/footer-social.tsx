import { Icons } from '@/ui/icons'
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { SocialIcon } from './social-icon'

export const FooterSocial = () => {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Superflex</h3>
      <p className='text-sm text-muted-foreground'>
        Ready to become a 10X engineer?
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
          icon={Icons.TikTok}
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
  )
}
