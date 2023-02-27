import { useRef, FormEvent } from 'react'
import { SignModalType } from ".."
import request from '../../../configs/axios'
import { useAppDispatch } from '../../../app/hooks'
import { User, login } from '../../../app/reducers/user.reducer'
import { toast } from 'react-toastify'
import { TextInputSimple } from '../../../components/TextInputSimple'
import { ButtonSimple } from '../../../components/ButtonSimple'

interface SignModalInProps {
  handleTransition: (type: SignModalType) => void,
}
export function SignModalIn({ handleTransition }: SignModalInProps) {
  const dispatch = useAppDispatch()

  const signInEmail = useRef<HTMLInputElement>(null)
  const signInPassword = useRef<HTMLInputElement>(null)

  function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (signInEmail.current?.value.trim() == '') return
    if (signInPassword.current?.value.trim() == '') return
    // 
    request.post('/chat/user/login', {
      email: signInEmail.current?.value,
      password: signInPassword.current?.value,
    }).then(resp => {
      dispatch(
        login({
          id: resp.data.id,
          name: resp.data.name,
          email: resp.data.email,
          url_picture: resp.data.url_picture,
        } satisfies User)
      )
    }).catch((err: any) => {
      if (err.response.status == 401) toast.error('User not found.', { autoClose: 3000 })
      console.error('error in login user:', err.message)
    })
  }

  function execHandleTransition() {
    // Reset input's
    if (signInEmail.current) signInEmail.current.value = ''
    if (signInPassword.current) signInPassword.current.value = ''
    // 
    handleTransition('signon')
  }

  return (
    <div className='text-center mx-auto w-[20rem]'>
      <h2 className='mx-auto w-[80%] font-semibold p-2 border-b-2 border-black'>Sign in and start chatting</h2>
      <form onSubmit={ handleSignIn } className='mt-2 flex flex-col justify-center'>
        <TextInputSimple type='text' placeholder="Email" name='signin-email-chat-online'
          ref={ signInEmail } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />
        <TextInputSimple type='password' placeholder="Password" name='signin-password-chat-online'
          ref={ signInPassword } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />

        <ButtonSimple type='submit' className='w-full rounded-md font-bold text-slate-200 bg-slate-800 py-2'>Sign in</ButtonSimple>
      </form>
      <div className='mt-2'>
        <a className='underline cursor-pointer' onClick={ execHandleTransition }>sign on</a>
      </div>
    </div>
  )
}