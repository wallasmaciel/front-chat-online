import { useEffect, useState, useRef, useCallback } from "react"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"
import request from "../../../configs/axios"
import { ScrollArea } from "../../../layouts/ScrollArea"
import { Message } from "../../MessageInline"
import { useAppSelector } from "../../../app/hooks"
import { Subscription } from "webstomp-client"
import { User } from "../../../app/reducers/user.reducer"
import './../../../assets/css/components/ChatAreaMain.css'
import { formatToDate } from "../../../utils/date.util"
import { ChatAreaMessages } from "../Messages"

interface ChatAreaMainProps extends ChatAreaChildProps {
  user_talk: User,
}
export function ChatAreaMain({ chatConnect, stompClient, user_talk }: ChatAreaMainProps) {
  let subscribe: Subscription

  const user = useAppSelector(state => state.userReducer.value)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEnd = useRef<any>()
  const requestListMsgs = useCallback(() => {
    if (!user) return
    if (user.id.trim() == '' || user_talk.id.trim() == '') return
    request.get(`/chat/user/talk/${user.id}/${user_talk.id}`)
      .then(resp => {
        // Clear messages before insert all
        setMessages([])
        // Insert all messages
        resp.data.messages.forEach((message: any) => {
          setMessages(oldMessages => [...oldMessages, {
            to: message.to,
            from: message.from,
            content: message.content,
            date: formatToDate(message.date, 'YYYY-MM-DDTHH:mm:ss'),
          }])
        })
      })
      .catch((err: Error) => {
        console.error('error in list msgs:', err.message)
      })
  }, [user, user_talk])

  useEffect(() => {
    requestListMsgs()
  }, [user_talk])

  useEffect(() => {
    if (!stompClient?.connected) return
    if (subscribe) return
    if (!user) return
    subscribe = stompClient.subscribe(`/topic/user/${user.id}/consume`, (payload) => {
      try {
        setMessages(oldMessages => [...oldMessages, JSON.parse(payload.body) satisfies Message])
      }catch (e) {
        console.log(e)
      }
    })
  }, [chatConnect, user])

  const scrollToBottomChat = () => {
    messagesEnd.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottomChat()
  }, [messages])

  return (
    <div className="flex-1 flex">
      <ScrollArea className="chat-view-messages">
        <ChatAreaMessages messages={ messages } />
        <div ref={ messagesEnd } />
      </ScrollArea>
    </div>
  )
}