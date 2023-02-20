import * as Separator from "@radix-ui/react-separator"
import './../../assets/css/components/SeparatorSimples.css'

interface SeparatorSimpleProps {
  orientation: "horizontal" | "vertical",
  className?: string,
}
export function SeparatorSimple({ orientation, className }: SeparatorSimpleProps) {
  return (
    <Separator.Root className={ `SeparatorRoot h-full ${className}` }
      orientation={ orientation } />
  )
}