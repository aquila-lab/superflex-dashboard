import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { useMemo } from 'react'

export const TextField = ({
  id,
  label,
  placeholder,
  value,
  setValue,
  isSubmitting,
  required = false,
  optional = false
}: {
  id: string
  label: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  isSubmitting: boolean
  required?: boolean
  optional?: boolean
}) => {
  const optionalLabel = useMemo(
    () =>
      optional && (
        <span className='text-xs text-muted-foreground'>(optional)</span>
      ),
    [optional]
  )

  return (
    <div className='space-y-3'>
      <Label htmlFor={id}>
        {label} {optionalLabel}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        className='w-full'
        required={required}
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={isSubmitting}
      />
    </div>
  )
}
