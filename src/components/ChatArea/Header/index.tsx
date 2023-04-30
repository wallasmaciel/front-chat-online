import { VideoCamera, Phone, MagnifyingGlass } from 'phosphor-react'
import { ButtonSimple } from "../../ButtonSimple"
import { SeparatorSimple } from "../../SeparatorSimple"
import { User } from "../../../app/reducers/user.reducer"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"
import { toast } from 'react-toastify'

interface ChatAreaHeaderProps extends ChatAreaChildProps {
  user_talk: User,
}
export function ChatAreaHeader({ user_talk }: ChatAreaHeaderProps) {
  function startCall() {
    toast.warn("Function 'start call' not implements...", { autoClose: 3000 });
  }
  function videoRecording() {
    toast.warn("Function 'video recording' not implements...", { autoClose: 3000 });
  }
  function searchMessage() {
    toast.warn("Function 'search message' not implements...", { autoClose: 3000 });
  }
  return (
    <div className="w-full h-16 flex flex-row justify-between items-center px-2 bg-white border-b-[1px] border-gray-300">
      <div className="flex">
        <span className="w-11 h-11 min-w-11 min-h-11 ml-4">
          <img src={ user_talk.url_picture ?? '/no-profile-picture.jpeg' }
            className="w-full h-full object-cover rounded-full" alt={ `user-image ${user_talk.name.split(' ')[0] ?? ''}` }/>
        </span>
        <div className="pt-1 pl-3">
          <label className="font-semibold text-black">{ user_talk.name }</label>
        </div>
      </div>
      <span className="flex justify-center items-center text-accent-primary">
        <ButtonSimple className="rounded-md p-4 bg-transparent hover:bg-hover-select"
          onClick={() => videoRecording()}>
          <VideoCamera size={ 18 } />
        </ButtonSimple>
        <ButtonSimple className="rounded-md p-4 bg-transparent hover:bg-hover-select"
          onClick={() => startCall()}>
          <Phone size={ 18 } />
        </ButtonSimple>
        <span className="h-6">
          <SeparatorSimple orientation="vertical" className="w-full h-full mx-2 bg-gray-300" />
        </span>
        <ButtonSimple className="rounded-md p-4 bg-transparent hover:bg-hover-select"
          onClick={() => searchMessage()}>
          <MagnifyingGlass size={ 18 } />
        </ButtonSimple>
      </span>
    </div>
  )
}