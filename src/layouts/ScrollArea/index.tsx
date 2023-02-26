import React, { ReactNode } from 'react'
import * as ScrollAreaRadix from '@radix-ui/react-scroll-area'

interface ScrollAreaDefaultProps {
  children: ReactNode,
}
function ScrollAreaRoot({ children }: ScrollAreaDefaultProps) {
  return (
    <ScrollAreaRadix.Root className='flex-1'>
      { children }
      <ScrollAreaRadix.Scrollbar orientation="horizontal">
        <ScrollAreaRadix.Thumb />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Scrollbar orientation="vertical">
        <ScrollAreaRadix.Thumb />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  )
}

interface ScrollAreaProps extends ScrollAreaDefaultProps {
  className?: string,
}
export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <ScrollAreaRoot>
      <ScrollAreaRadix.Viewport className={ className }>
        { children }
      </ScrollAreaRadix.Viewport>
    </ScrollAreaRoot>
  )
}