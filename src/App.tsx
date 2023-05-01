import { useState, useEffect, useRef, DragEventHandler, DragEvent } from 'react'
import { UserTalk } from './components/UserTalk'
import { TextInputSimple } from './components/TextInputSimple'
import { ScrollArea } from './layouts/ScrollArea'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { User, logout } from './app/reducers/user.reducer'
import request from './configs/axios'
import { ArrowClockwise, SignOut } from 'phosphor-react'
import { ButtonSimple } from './components/ButtonSimple'
import './assets/css/App.css'
import { SignModal } from './layouts/SignModal'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer.value)
  const navigate = useNavigate()

  const searchUser = useRef<HTMLInputElement>(null)

  const [openLoginModal, setOpenLoginModal] = useState<boolean>(true)
  const [othersUsers, setOthersUsers] = useState<User[]>([])
  const [filterUser, setFilterUser] = useState<string | null>(null)

  const [userListOpen, setUserListOpen] = useState<boolean>(false)

  function handleInitChat(user_talk: User) {
    if (!user_talk) return
    navigate(`/${user_talk.id}`)
  }

  function loadOtherUsers() {
    if (!user) {
      setOthersUsers([])
      return
    }
    // 
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

  function handleLogout() {
    dispatch(logout())
    navigate('/')
  }

  function handleSearchUser() {
    setFilterUser((searchUser.current)? searchUser.current.value : null)
  }

  function toggleOpenUserList() {
    if (window.innerWidth > 640) return
    setUserListOpen(!userListOpen)
  }

  const [oldPositionSideMenu, setOldPositionSideMenu] = useState<{x: number, y: number}>({
    x: 0,
    y: 0,
  })
  function dragSideMenu(event: DragEvent<HTMLDivElement>) {
    if (window.innerWidth > 640) return
    setUserListOpen(event.clientX > oldPositionSideMenu.x)
    //
    setOldPositionSideMenu({
      x: event.clientX,
      y: event.clientY,
    })
  }

  function onLoadResize() {
    setUserListOpen(false)
  }

  useEffect(() => {
    window.addEventListener("resize", onLoadResize);
    // 
    loadOtherUsers()
    setOpenLoginModal(user == undefined)
  }, [user])
  return (
    <div className='flex w-screen max-h-screen'>
      <div className={ `flex h-screen z-10 absolute ${userListOpen? 'w-screen' : 'max-w-sm -ml-[20rem]'} sm:relative sm:ml-0 sm:z-0 transition-all` }>
        <div className='flex-1 flex flex-col w-80 max-w-sm bg-white border-r-[1px] border-gray-300'>
          <div className='m-1 flex items-center'>
            <TextInputSimple type='text' placeholder="Pesquisar uma conversa" ref={ searchUser }
              onChange={() => handleSearchUser() } />
            <ButtonSimple className='px-1 py-2 ml-1 rounded-md'
              title='Refresh chat' onClick={() => loadOtherUsers()}>
              <ArrowClockwise size={ 24 } className='text-white w-12'/>
            </ButtonSimple>
          </div>
          <ScrollArea className='h-full pb-4 availableChats flex-1'>
            {othersUsers.filter(value => {
              return filterUser? 
                // Apply filter in list of users
                value.name.toLowerCase().indexOf(filterUser.trim().toLowerCase()) > -1 : 
                // View all users without filter
                true
            }).map((value, index) => <UserTalk key={ index } user={ value } handleInitChat={ handleInitChat } />)}
          </ScrollArea>
          <div className='w-full flex justify-end'>
            <ButtonSimple className='bg-transparent hover:bg-hover-select rounded-sm text-accent-primary p-2'
              title='Logout' onClick={ handleLogout }>
              <SignOut size={ 24 } />
            </ButtonSimple>
          </div>
        </div>
        <div className={ `w-6 z-10 ${userListOpen? 'flex-1' : '' } bg-transparent relative sm:absolute` } draggable={ true }
          onClick={ toggleOpenUserList } onDragEnd={ dragSideMenu }></div>
      </div>
      <div className='flex-1 h-screen flex bg-white'>
        <Outlet />
      </div>

      <SignModal open={ openLoginModal }/>
    </div>
  )
}

export default App
