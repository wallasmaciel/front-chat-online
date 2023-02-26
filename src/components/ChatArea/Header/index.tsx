import { useState } from "react"
import { ChatData } from "../../UserTalk"
import { VideoCamera, Phone, MagnifyingGlass } from 'phosphor-react'
import { ButtonSimple } from "../../ButtonSimple"
import { SeparatorSimple } from "../../SeparatorSimple"
import { User } from "../../../app/reducers/user.reducer"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"

interface ChatAreaHeaderProps extends ChatAreaChildProps {
  user_talk: User,
}
export function ChatAreaHeader({ user_talk }: ChatAreaHeaderProps) {
  return (
    <div className="w-full h-16 flex flex-row justify-between items-center px-2 bg-slate-800 shadow-md">
      <div className="flex">
        <span className="w-11 h-11 ml-4">
          <img src={ user_talk.url_picture }
            className="w-full h-full object-cover rounded-full" alt={ `user-image ${user_talk.name.split(' ')[0] ?? ''}` }/>
        </span>
        <div className="pt-1 pl-3">
          <label className="font-bold text-slate-200">{ user_talk.name }</label>
        </div>
      </div>
      <span className="flex justify-center items-center text-slate-200">
        <ButtonSimple className="rounded-md p-4">
          <VideoCamera size={ 18 } />
        </ButtonSimple>
        <ButtonSimple className="rounded-md p-4">
          <Phone size={ 18 } />
        </ButtonSimple>
        <span className="h-6">
          <SeparatorSimple orientation="vertical" className="w-full h-full mx-2 bg-slate-400" />
        </span>
        <ButtonSimple className="rounded-md p-4">
          <MagnifyingGlass size={ 18 } />
        </ButtonSimple>
      </span>
    </div>
  )
}