import { useRef, KeyboardEvent } from 'react'
import { Microphone, Paperclip, Smiley } from "phosphor-react"
import { ButtonSimple } from "../../ButtonSimple"
import { TextInputSimple } from "../../TextInputSimple"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"

export function ChatAreaFooter({ chatConnect = false, stompClient }: ChatAreaChildProps) {
  const inputMessage = useRef<HTMLInputElement>(null)

  function sendMessage() {
    // Verify 'ref' is valid
    if (!inputMessage.current) return
    // Verify field is not empty
    if (inputMessage.current.value.trim() == '') return
    if (!stompClient?.connected) {
      console.log('Connection with stomp is not open')
      return
    }
    stompClient.send('/app/send', JSON.stringify({
      to: '9615fe65-cc43-4ab4-a332-8ad3b84be657',
      from: '9615fe65-cc43-4ab4-a332-8ad3b84be657',
      content: inputMessage.current.value
    }))
    // message sent successfully
    inputMessage.current.value = ''
  }
  function handleInputKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key.trim().toLowerCase() == 'enter') sendMessage()
  }
  return (
    <div className="flex justify-between bg-zinc-300 py-[.2rem] border-t-[.1rem] border-t-zinc-600/40">
      <div className="flex items-center justify-center">
        <ButtonSimple className="rounded-md p-4">
          <Smiley size={ 18 } />
        </ButtonSimple>
        <ButtonSimple className="rounded-md p-4">
          <Paperclip size={ 18 } />
        </ButtonSimple>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <TextInputSimple ref={ inputMessage } className="bg-zinc-300 hover:bg-zinc-200" placeholder="Mensagem"
          onKeyUp={ handleInputKeyUp }/>
      </div>
      <div className="flex items-center justify-center">
        <ButtonSimple className="rounded-md p-4">
          <Microphone size={ 18 } />
        </ButtonSimple>
      </div>
    </div>
  )
}