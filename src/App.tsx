import { useState, useEffect, useRef } from 'react'
import { UserTalk } from './components/UserTalk'
import { TextInputSimple } from './components/TextInputSimple'
import { ChatArea } from './layouts/ChatArea'
import { ScrollArea } from './layouts/ScrollArea'
import { useAppSelector } from './app/hooks'
import { User } from './app/reducers/user.reducer'
import request from './configs/axios'
import { ArrowClockwise } from 'phosphor-react'
import { ButtonSimple } from './components/ButtonSimple'
import './assets/css/App.css'
import { SignModal } from './layouts/SignModal'
import { useNavigate } from 'react-router-dom'

function App() {
  const user = useAppSelector(state => state.userReducer.value)
  const navigate = useNavigate()

  const searchUser = useRef<HTMLInputElement>(null)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(true)
  const [othersUsers, setOthersUsers] = useState<User[]>([])
  const [filterUser, setFilterUser] = useState<string | null>(null)

  function handleInitChat(user_talk: User) {
    if (!user_talk) return
    navigate(`/${user_talk.id}`)
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

  useEffect(() => {
    if (user) loadOtherUsers()
    setOpenLoginModal(user == undefined)
  }, [user])
  return (
    <div className='flex w-screen max-h-screen'>
      <div className='flex-1 h-screen max-w-sm bg-white border-r-[1px] border-gray-300'>
        <div className='m-1 flex items-center'>
          <TextInputSimple type='text' placeholder="Pesquisar uma conversa" ref={ searchUser }
            onChange={() => handleSearchUser() } />
          <ButtonSimple className='px-1 py-2 ml-1 rounded-md'
            title='Refresh chat' onClick={() => loadOtherUsers()}>
            <ArrowClockwise size={ 24 } className='text-white w-12'/>
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
      <div className='flex-1 flex bg-white'>
        <ChatArea />
      </div>

      <SignModal open={ openLoginModal }/>
    </div>
  )
}

export default App
