export const FooterCopyright = ({ year }: { year: number }) => {
  return (
    <p className='text-sm text-muted-foreground'>
      Aquila Labs, Inc. All rights reserved. © {year}
    </p>
  )
}
