import { memo } from 'react'
import { SuccessContent } from './success-content'

export const SuccessCard = memo(() => (
  <div className='bg-card rounded-xl p-6'>
    <SuccessContent />
  </div>
))
