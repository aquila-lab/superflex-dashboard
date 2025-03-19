import { Progress } from '@/ui/progress'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/ui/tooltip'

export const RequestProgressBar = ({
  title,
  isUnlimited,
  usedRequests,
  totalRequests,
  percentage
}: {
  title: string
  isUnlimited: boolean
  usedRequests: number
  totalRequests: number
  percentage: number
}) => {
  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-baseline text-sm'>
        <span>{title}</span>
        {isUnlimited ? (
          <span className='text-muted-foreground text-xs leading-none'>
            Unlimited requests available
          </span>
        ) : (
          <span>
            {usedRequests} / {totalRequests}
          </span>
        )}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Progress value={percentage} />
            </div>
          </TooltipTrigger>
          <TooltipContent>{usedRequests} requests used</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
