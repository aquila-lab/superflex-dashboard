import type { Option } from '@/lib/types'
import { Label } from '@/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui/select'
import { useMemo } from 'react'

export const SelectField = ({
  id,
  label,
  placeholder,
  value,
  setValue,
  options,
  isSubmitting,
  required = false,
  optional = false
}: {
  id: string
  label: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  options: readonly Option[]
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
      <Select
        value={value}
        onValueChange={value => setValue(value)}
        required={required}
        disabled={isSubmitting}
      >
        <SelectTrigger
          id={id}
          className='w-full'
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='w-full'>
          <SelectGroup>
            {options.map(option => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
