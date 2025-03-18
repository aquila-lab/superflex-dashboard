import { Button } from '@/ui/button'
import { CardFooter } from '@/ui/card'
import { Separator } from '@/ui/separator'

export const PlanCardFooter = ({
  buttonText,
  popular,
  onSelect
}: {
  buttonText: string
  popular?: boolean
  onSelect: () => void
}) => {
  return (
    <CardFooter className='flex flex-col gap-4'>
      <Separator />
      <Button
        variant={popular ? 'default' : 'outline'}
        className='w-full py-5'
        size='lg'
        onClick={onSelect}
      >
        {buttonText}
      </Button>
    </CardFooter>
  )
}
