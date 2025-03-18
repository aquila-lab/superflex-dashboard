import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/ui/tooltip'

export const SocialIcon = ({
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
            <Icon className='size-4' />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
