export const FormHeader = ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) => {
  return (
    <div className='flex flex-col items-center gap-2 text-center'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-muted-foreground text-sm text-balance'>{subtitle}</p>
    </div>
  )
}
