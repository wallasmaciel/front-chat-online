import React, { ReactNode } from 'react'
import './../../assets/css/components/AlertDialogSimple.css'

interface AlertDialogSimpleProps {
  open: boolean,
  children: ReactNode,
  className?: string,
}
export function AlertDialogSimple({ open, children, className }: AlertDialogSimpleProps) {
  return (
    <div className={ `absolute flex items-center justify-center w-screen h-screen before:absolute before:bg-black/30 before:w-screen before:h-screen ${!open? 'hidden' : ''}` }>
      <div className={ `absolute min-w-[20rem] py-5 bg-slate-200 rounded-md ${className}` }>
        <div>
          { children }
        </div>
      </div>
    </div>
  )
}
