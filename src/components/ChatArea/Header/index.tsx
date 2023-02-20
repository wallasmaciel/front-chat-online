import { useState } from "react"
import { ChatData } from "../../ChatInline"
import { VideoCamera, Phone, MagnifyingGlass } from 'phosphor-react'
import { ButtonSimple } from "../../ButtonSimple"
import { SeparatorSimple } from "../../SeparatorSimple"

export function ChatAreaHeader() {
  const [chatData, setChatData] = useState<ChatData>({
    user: {
      name: 'Manu Teste',
      profileImage: 'https://images.pexels.com/photos/5081397/pexels-photo-5081397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: 'The last message',
  })
  return (
    <div className="w-full h-16 flex flex-row justify-between px-2 py-2 bg-zinc-300">
      <div className="flex">
        <span className="w-12 h-12 max-w-12 max-h-12 ml-4">
          <img src={ chatData.user.profileImage }
            className="w-full h-full object-cover rounded-full" alt="user-image"/>
        </span>
        <div className="pt-1 pl-3">
          <label className="font-bold">{ chatData.user.name }</label>
        </div>
      </div>
      <span className="flex justify-center items-center">
        <ButtonSimple className="rounded-md p-4">
          <VideoCamera size={ 18 } />
        </ButtonSimple>
        <ButtonSimple className="rounded-md p-4">
          <Phone size={ 18 } />
        </ButtonSimple>
        <SeparatorSimple orientation="vertical" className="max-h-6 mx-2 bg-zinc-600" />
        <ButtonSimple className="rounded-md p-4">
          <MagnifyingGlass size={ 18 } />
        </ButtonSimple>
      </span>
    </div>
  )
}