import { FormEvent, useRef } from "react"
import request from "../../../configs/axios"
import { toast } from "react-toastify"
import { TextInputSimple } from "../../../components/TextInputSimple"
import { ButtonSimple } from "../../../components/ButtonSimple"
import { SignModalType } from ".."

interface SignModalOnProps {
  handleTransition: (type: SignModalType) => void,
}
export function SignModalOn({ handleTransition }: SignModalOnProps) {
  const signOnName = useRef<HTMLInputElement>(null)
  const signOnEmail = useRef<HTMLInputElement>(null)
  const signOnPassword = useRef<HTMLInputElement>(null)

  function handleSignOn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (signOnName.current?.value.trim() == '') return
    if (signOnEmail.current?.value.trim() == '') return
    if (signOnPassword.current?.value.trim() == '') return
    // 
    request.post('/chat/user/sign-on', {
      name: signOnName.current?.value,
      email: signOnEmail.current?.value,
      password: signOnPassword.current?.value,
    }).then(resp => {
      if (resp.status == 201) toast.success('User created successfully', { autoClose: 3000 })
      console.log(resp)
      // Move to signin
      execHandleTransition()
    }).catch((err: any) => {
      toast.error(err.response.data.error, { autoClose: 3000 })
      console.error('error in login user:', err.message)
    })
  }

  function execHandleTransition() {
    // Reset input's
    if (signOnName.current) signOnName.current.value = ''
    if (signOnEmail.current) signOnEmail.current.value = ''
    if (signOnPassword.current) signOnPassword.current.value = ''
    //
    handleTransition('signin')
  }

  return (
    <div className='text-center mx-auto w-[20rem]'>
      <h2 className='mx-auto w-[80%] font-semibold p-2 border-b-2 border-black'>Sign on and start chatting</h2>
      <form onSubmit={ handleSignOn } className='mt-2 flex flex-col justify-center'>
      <TextInputSimple type='text' placeholder="Name" name='signon-name-chat-online'
          ref={ signOnName } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />
        <TextInputSimple type='text' placeholder="Email" name='signon-email-chat-online'
          ref={ signOnEmail } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />
        <TextInputSimple type='password' placeholder="Password" name='signon-password-chat-online'
          ref={ signOnPassword } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />

        <ButtonSimple type='submit' className='w-full rounded-md font-bold text-slate-200 bg-slate-800 py-2'>Sign on</ButtonSimple>
      </form>
      <div className='mt-2'>
        <a className='underline cursor-pointer' onClick={ execHandleTransition }>{ 'return to sign in' }</a>
      </div>
    </div>
  )
}