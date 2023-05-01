import { useEffect, useState } from "react"
import { ChatAreaHeader } from "../../components/ChatArea/Header"
import { ChatAreaFooter } from "../../components/ChatArea/Footer"
import { ChatAreaMain } from "../../components/ChatArea/Main"
import webstomp from "webstomp-client"
import { Client } from "webstomp-client"
import { useAppSelector } from "../../app/hooks"
import { User } from "../../app/reducers/user.reducer"
import { redirect, useNavigate, useParams } from "react-router-dom"
import request from "../../configs/axios"

export interface ChatAreaChildProps {
  chatConnect: boolean,
  stompClient?: Client,
}
export function ChatArea() {
  const {user_id} = useParams()
  const navigation = useNavigate()
  const timeToRetryConnect: number = 10000
  const user = useAppSelector(state => state.userReducer.value)
  const [chatConnect, setChatConnect] = useState<boolean>(false)
  const [stompClient, setStompClient] = useState<Client>()
  const [userTalk, setUserTalk] = useState<User | null>(null)

  async function requestUserData() {
    if (!user) {
      navigation('/')
      return
    }
    // 
    try {
      const response = await request.get(`/chat/user/${user_id}`)
      setUserTalk(response.data as User)
    }catch(err){
      console.error('error in request user data.', err)
    }
  }

  function connectWebSocket() {
    if (!user) return
    // 
    try {
      const connection = new WebSocket('ws://localhost:8080/gs-websocket')
      setStompClient(webstomp.over(connection))
    } catch(e) {
      console.log('error', e)
    }
  }

  function listenerRoute() {
    if (!stompClient) return
    if (!user) return
    // 
    stompClient?.connect({}, ()=>{
      stompClient.send('/app/listener', JSON.stringify({
        id: user.id, 
        name: user.name,
      }))
      //
      setChatConnect(true)
    }, (e) => {
      setChatConnect(false)
      console.error('error', e)
      console.info(`reconnect in ${timeToRetryConnect / 1000}s`)

      setTimeout(() => {
        if (stompClient.connected) return
        try {
          console.log('reconnect to websocket...')
          stompClient.disconnect()
        } finally {
          connectWebSocket()
        }
      }, timeToRetryConnect)
    })
  }

  useEffect(() => {
    connectWebSocket()
  }, [user])

  useEffect(() => {
    listenerRoute()
  }, [stompClient, user_id])

  useEffect(() => {
    requestUserData()
  }, [user_id])

  return (
    <section className="flex-1 flex flex-col justify-center items-center">
      <div className="w-full max-w-full max-h-screen flex-1 flex flex-col justify-between">
        { !userTalk? <span className="flex-1 text-center">Invalid user</span> : (
          <>
            <ChatAreaHeader chatConnect={ chatConnect } stompClient={ stompClient } user_talk={ userTalk } />
            <ChatAreaMain chatConnect={ chatConnect } stompClient={ stompClient } user_talk={ userTalk } />
            <ChatAreaFooter chatConnect={ chatConnect } stompClient={ stompClient } user_talk={ userTalk } />
          </>
        ) }
      </div>
    </section>
  )
}