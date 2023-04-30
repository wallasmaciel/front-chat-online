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
    <div className="flex p-3 cursor-pointer hover:bg-hover-select"
      onClick={ () => handleInitChat(user) }>
      <span className="w-14 h-14 ml-4">
        <img src={ user.url_picture ?? '/no-profile-picture.jpeg' }
          className="w-full h-full object-cover rounded-xl" alt={ `user image ${user.name.split(' ')[0] ?? ''}` }/>
      </span>
      <div className="pt-1 pl-3">
        <label className="text-black font-bold">{ user.name }</label>
        <p>
          { 
          // user.lastMessage 
          }
        </p>
      </div>
    </div>
  )
}