import { forwardRef, InputHTMLAttributes, Ref } from "react" 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const TextInputSimple = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref?: Ref<HTMLInputElement>) => (
  <div className={ `w-full p-2 rounded-md bg-slate-400 ${props.className}` }>
    <input { ...props } ref={ ref } type='text' className="w-full bg-transparent text-white placeholder:text-white/50 outline-none" />
  </div>
))