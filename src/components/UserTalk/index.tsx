import { useState } from "react"
import { User } from "../../app/reducers/user.reducer"

export interface ChatData {
  user: User,
  lastMessage?: string,
}
interface UserTalkProps {
  user: User,
  handleInitChat: (user_talk: User) => void,
}
export function UserTalk({ user, handleInitChat }: UserTalkProps) {
  return (
    <div className="flex p-3 cursor-pointer hover:bg-slate-700"
      onClick={ () => handleInitChat(user) }>
      <span className="w-16 h-16 max-w-16 max-h-16 ml-4">
        <img src={ user.url_picture }
          className="w-full h-full object-cover rounded-full" alt={ `user image ${user.name.split(' ')[0] ?? ''}` }/>
      </span>
      <div className="pt-1 pl-3">
        <label className="text-slate-200 font-bold">{ user.name }</label>
        <p>
          { 
          // user.lastMessage 
          }
        </p>
      </div>
    </div>
  )
}