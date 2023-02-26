import { ReactNode, ButtonHTMLAttributes } from "react"

export function ButtonSimple(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button { ...props } className={ `hover:bg-slate-600 ${props.className}` }>
      { props.children }
    </button>
  )
}