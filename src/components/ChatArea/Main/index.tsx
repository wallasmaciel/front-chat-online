import { useEffect, useState } from "react"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"

export function ChatAreaMain({ chatConnect = false, stompClient }: ChatAreaChildProps) {
  const [msgs, setMsgs] = useState<string[]>([])

  useEffect(() => {
    if (!stompClient?.connected) return
    stompClient.subscribe('/topic/user/9615fe65-cc43-4ab4-a332-8ad3b84be657/consume', (payload) => {
      try {
        setMsgs(oldValue => [...oldValue, JSON.parse(payload.body).content])
      }catch (e) {
        console.log(e)
      }
    })
  }, [chatConnect])

  return (
    <div className="flex-1">
      { msgs.map((value, key) => <p key={ key }>{ value }</p>) }
    </div>
  )
}