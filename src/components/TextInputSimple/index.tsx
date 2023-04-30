import { forwardRef, InputHTMLAttributes, Ref } from "react" 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classdiv?: string,
}
export const TextInputSimple = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref?: Ref<HTMLInputElement>) => (
  <div className={ `w-full p-2 rounded-md text-black bg-input-simple ${props.classdiv}` }>
    <input { ...props } ref={ ref } 
      className={`w-full bg-transparent text-sm px-1 outline-none ${props.className}` } />
  </div>
))