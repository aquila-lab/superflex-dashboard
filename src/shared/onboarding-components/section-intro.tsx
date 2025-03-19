import { memo } from 'react'

export const SectionIntro = memo(
  ({
    text
  }: {
    text: string
  }) => {
    return (
      <div className='space-y-4 text-base'>
        <p>{text}</p>
      </div>
    )
  }
)
