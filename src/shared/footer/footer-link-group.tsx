import type { ReactNode } from 'react'

export const FooterLinkGroup = ({
  title,
  children
}: { title: string; children: ReactNode }) => {
  return (
    <div className='space-y-2'>
      <h4 className='text-sm font-medium'>{title}</h4>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  )
}
