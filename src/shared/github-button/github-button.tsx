import { Button } from '@/ui/button'
import { Star } from 'lucide-react'

export const GitHubButton = () => {
  return (
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
  )
}
