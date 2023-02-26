import { useState, useEffect, useRef, FormEvent } from 'react'
import { UserTalk } from './components/UserTalk'
import { TextInputSimple } from './components/TextInputSimple'
import { ChatArea } from './layouts/ChatArea'
import { ScrollArea } from './layouts/ScrollArea'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { User, login } from './app/reducers/user.reducer'
import request from './configs/axios'
import { ArrowClockwise } from 'phosphor-react'
import { ButtonSimple } from './components/ButtonSimple'
import { AlertDialogSimple } from './components/AlertDialogSimple'
import './assets/css/App.css'

function App() {
  const user = useAppSelector(state => state.userReducer.value)
  const dispatch = useAppDispatch()

  const searchUser = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(true)
  const [othersUsers, setOthersUsers] = useState<User[]>([])
  const [filterUser, setFilterUser] = useState<string | null>(null)
  const [userTalk, setUserTalk] = useState<User>()

  function handleInitChat(user_talk: User) {
    setUserTalk(user_talk)
  }

  function loadOtherUsers() {
    request.get(`/chat/user/list/${user?.id}`)
      .then(resp => {
        // Clear others users before insert all
        setOthersUsers([])
        // Insert all others users
        resp.data.forEach((user: any) => {
          setOthersUsers(oldUsers => [...oldUsers, user satisfies User])
        })
      })
      .catch((err: Error) => {
        console.error('error in list users to talk:', err.message)
      })
  }

  function handleSearchUser() {
    setFilterUser((searchUser.current)? searchUser.current.value : null)
  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (inputEmail.current?.value.trim() == '') return
    if (inputPassword.current?.value.trim() == '') return
    // 
    request.post('/chat/user/login', {
      email: inputEmail.current?.value,
      password: inputPassword.current?.value,
    }).then(resp => {
      dispatch(
        login({
          id: resp.data.id,
          name: resp.data.name,
          email: resp.data.email,
          url_picture: resp.data.url_picture,
        } satisfies User)
      )
    }).catch((err: Error) => {
      console.error('error in login user:', err.message)
    })
  }

  useEffect(() => {
    if (user) loadOtherUsers()
    setOpenLoginModal(user == undefined)
  }, [user])
  return (
    <div className='flex w-screen max-h-screen'>
      <div className='flex-1 h-screen max-w-sm bg-slate-800 border-r-2 border-slate-700'>
        <div className='m-1 flex items-center'>
          <TextInputSimple type='text' placeholder="Pesquisar uma conversa" ref={ searchUser }
            onChange={() => handleSearchUser() } classdiv='border-b-2 focus-within:border-slate-300'/>
          <ButtonSimple className='px-1 py-2 ml-1 rounded-md'
            title='Refresh chat' onClick={() => loadOtherUsers()}>
            <ArrowClockwise size={ 24 } className='text-slate-200 w-12'/>
          </ButtonSimple>
        </div>
        <ScrollArea className='h-full pb-4 availableChats'>
          {othersUsers.filter(value => {
            return filterUser? 
              // Apply filter in list of users
              value.name.toLowerCase().indexOf(filterUser.trim().toLowerCase()) > -1 : 
              // View all users without filter
              true
          }).map((value, index) => <UserTalk key={ index } user={ value } handleInitChat={ handleInitChat } />)}
        </ScrollArea>
      </div>
      <div className='flex-1 flex bg-slate-600'>
        <ChatArea userTalk={ userTalk } />
      </div>

      <AlertDialogSimple open={ openLoginModal } className='px-2 w-auto'>
        <div className='text-center mx-auto w-[20rem]'>
          <h2 className='mx-auto w-[80%] font-semibold p-2 border-b-2 border-black'>Log in and start chatting</h2>
          <form onSubmit={ handleLogin } className='mt-2 flex flex-col justify-center'>
            <TextInputSimple type='text' placeholder="Email" name='email-chat-online'
              ref={ inputEmail } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />
            <TextInputSimple type='password' placeholder="Password" name='password-chat-online'
              ref={ inputPassword } classdiv='ring-1 bg-white mb-2' className='text-slate-600 placeholder:text-slate-300' />

            <ButtonSimple type='submit' className='w-full rounded-md font-bold text-slate-200 bg-slate-800 py-2'>Sign in</ButtonSimple>
          </form>
        </div>
      </AlertDialogSimple>
    </div>
  )
}

export default App
