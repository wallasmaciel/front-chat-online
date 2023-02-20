import { useEffect, useState } from "react"
import { ChatAreaHeader } from "../../components/ChatArea/Header"
import { ChatAreaFooter } from "../../components/ChatArea/Footer"
import { ChatAreaMain } from "../../components/ChatArea/Main"
import webstomp from "webstomp-client"
import { Client } from "webstomp-client"

export interface ChatAreaChildProps {
  chatConnect: boolean,
  stompClient?: Client,
}
export function ChatArea() {
  const [chatConnect, setChatConnect] = useState<boolean>(false)
  const [stompClient, setStompClient] = useState<Client>()
  const [chatActive, setChatActive] = useState<string | null>(null)
  useEffect(() => {
    try {
      const connection = new WebSocket('ws://localhost:8080/gs-websocket')
      setStompClient(webstomp.over(connection))
    } catch(e) {
      console.log('error', e)
    }
  }, [])

  useEffect(() => {
    if (!stompClient) return
    stompClient?.connect({}, ()=>{
      stompClient.send('/app/listener', JSON.stringify({
        id: '9615fe65-cc43-4ab4-a332-8ad3b84be657', 
        name: 'Wallas',
      }))
      //
      setChatConnect(true)
    }, (e) => {
      setChatConnect(false)
      console.log('error', e)
    })
  }, [stompClient])

  return (
    <section className="flex-1 flex flex-col justify-center items-center">
      { chatActive? (
        <>
          <span className='pb-2'><img src='/vite.svg' alt='whatsapp-icon'/></span>
          <div className='text-center text-gray-300'>
            <p>Chat-online para Web</p>
            <p>Envie e receba mensagens sem precisar manter seu celular conectado à internet.</p>
          </div>
        </>
        ) : (
          <div className="w-full h-full max-w-full max-h-full flex-1 flex flex-col justify-between">
            <ChatAreaHeader />
            <ChatAreaMain chatConnect={ chatConnect } stompClient={ stompClient } />
            <ChatAreaFooter chatConnect={ chatConnect } stompClient={ stompClient } />
          </div>
        )
      }
    </section>
  )
}