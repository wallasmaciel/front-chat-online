import { ReactNode, ButtonHTMLAttributes } from "react"

export function ButtonSimple(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button { ...props } className={ `bg-transparent hover:bg-zinc-200 ${props.className}` } title="Button">
      { props.children }
    </button>
  )
}