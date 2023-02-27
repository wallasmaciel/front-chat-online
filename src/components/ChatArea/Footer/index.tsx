import { useRef, useCallback, KeyboardEvent } from 'react'
import { Microphone, Paperclip, Smiley } from "phosphor-react"
import { ButtonSimple } from "../../ButtonSimple"
import { TextInputSimple } from "../../TextInputSimple"
import { ChatAreaChildProps } from "../../../layouts/ChatArea"
import { useAppSelector } from '../../../app/hooks'
import request from '../../../configs/axios'
import { User } from '../../../app/reducers/user.reducer'
import { toast } from 'react-toastify'

interface ChatAreaFooterProps extends ChatAreaChildProps {
  user_talk: User,
}
export function ChatAreaFooter({ user_talk }: ChatAreaFooterProps) {
  const user = useAppSelector(state => state.userReducer.value)
  const inputMessage = useRef<HTMLInputElement>(null)

  const sendMessage = useCallback(() => {
    // Verify 'ref' is valid
    if (!inputMessage.current) return
    // Verify field is not empty
    if (inputMessage.current.value.trim() == '') return
    if (!user) return
    request.post('/chat/send', {
      to: user.id,
      from: user_talk.id,
      content: inputMessage.current.value
    }).then(resp => {
      // message sent successfully
      if (inputMessage.current) 
        inputMessage.current.value = ''
    }).catch((err: Error) => {
      console.error('error in send message:', err.message)
    })
    /*if (!stompClient?.connected) {
      console.log('Connection with stomp is not open')
      return
    }
    stompClient.send('/app/send', JSON.stringify({
      to: user.id,
      from: user_talk,
      content: inputMessage.current.value
    }))*/
  }, [user, user_talk])
  function handleInputKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key.trim().toLowerCase() == 'enter') sendMessage()
  }

  function sendSticker() {
    toast.warn("Function 'send sticker' not implements...", { autoClose: 3000 });
  }
  function sendAttachment() {
    toast.warn("Function 'send attachment' not implements...", { autoClose: 3000 });
  }
  function voiceRecording() {
    toast.warn("Function 'voice recording' not implements...", { autoClose: 3000 });
  }
  return (
    <div className="flex justify-between bg-slate-800 py-[.2rem] pb-2 border-t-[.1rem] border-t-zinc-600/40">
      <div className="flex items-center justify-center px-1">
        <ButtonSimple className="rounded-md p-4 text-slate-200"
          onClick={() => sendSticker()}>
          <Smiley size={ 18 } />
        </ButtonSimple>
        <ButtonSimple className="rounded-md p-4 text-slate-200"
          onClick={() => sendAttachment()}>
          <Paperclip size={ 18 } />
        </ButtonSimple>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <TextInputSimple ref={ inputMessage } placeholder="Mensagem" className='text-slate-200'
          onKeyUp={ handleInputKeyUp }/>
      </div>
      <div className="flex items-center px-1 justify-center">
        <ButtonSimple className="rounded-md p-4 text-slate-200"
          onClick={() => voiceRecording()}>
          <Microphone size={ 18 } />
        </ButtonSimple>
      </div>
    </div>
  )
}