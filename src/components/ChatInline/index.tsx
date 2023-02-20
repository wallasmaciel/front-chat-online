import { useState } from "react"

interface User {
  name: string,
  profileImage: string,
}
export interface ChatData {
  user: User,
  lastMessage?: string,
}
interface ChatInlineProps {
  userId: string,
}
export function ChatInline({ userId }: ChatInlineProps) {
  const [chatData, setChatData] = useState<ChatData>({
    user: {
      name: 'Manu Teste',
      profileImage: 'https://images.pexels.com/photos/5081397/pexels-photo-5081397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    lastMessage: 'The last message',
  })
  return (
    <div className="flex p-3 cursor-pointer hover:bg-slate-200">
      <span className="w-16 h-16 max-w-16 max-h-16 ml-4">
        <img src={ chatData.user.profileImage }
          className="w-full h-full object-cover rounded-full" alt="user-image"/>
      </span>
      <div className="pt-1 pl-3">
        <label className="font-bold">{ chatData.user.name }</label>
        <p>{ chatData.lastMessage }</p>
      </div>
    </div>
  )
}