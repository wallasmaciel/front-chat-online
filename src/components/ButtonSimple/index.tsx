import { ReactNode, ButtonHTMLAttributes } from "react"

export function ButtonSimple(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button { ...props } className={ ` bg-accent-primary hover:bg-accent-primary/80 ${props.className}` }>
      { props.children }
    </button>
  )
}