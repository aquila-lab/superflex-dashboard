import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import type { ComponentProps } from 'react'

export const Collapsible = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Root>) => {
  return (
    <CollapsiblePrimitive.Root
      data-slot='collapsible'
      {...props}
    />
  )
}

export const CollapsibleTrigger = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot='collapsible-trigger'
      {...props}
    />
  )
}

export const CollapsibleContent = ({
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot='collapsible-content'
      {...props}
    />
  )
}
