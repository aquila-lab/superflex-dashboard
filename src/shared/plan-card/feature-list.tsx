import type { ExtendedPlanCard } from '@/lib/types'
import { CheckIcon } from 'lucide-react'

export const FeatureList = ({
  features
}: { features: ExtendedPlanCard['features'] }) => {
  return (
    <ul className='space-y-3'>
      {features.map(feature => (
        <li
          key={feature.text}
          className='flex items-start gap-3'
        >
          <CheckIcon className='text-primary size-4 mt-0.5 flex-shrink-0' />
          <span className='text-sm'>{feature.text}</span>
        </li>
      ))}
    </ul>
  )
}
