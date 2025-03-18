export const FooterLinkGroup = ({
  title,
  children
}: { title: string; children: React.ReactNode }) => {
  return (
    <div className='space-y-2'>
      <h4 className='text-sm font-medium'>{title}</h4>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  )
}
