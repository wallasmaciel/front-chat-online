import { useEffect, ReactNode } from 'react'
import { formatToString } from "../../../utils/date.util"
import { Message, MessageInline } from "../../MessageInline"

interface ChatAreaMessagesProps {
  messages: Message[], 
}
export function ChatAreaMessages({ messages }: ChatAreaMessagesProps) {
  let tempDate: string

  function changeDateTitle(date: Date): ReactNode | undefined {
    let displayChangeDate: boolean = tempDate != formatToString(date, 'YYYY-MM-DD')
    tempDate = formatToString(date, 'YYYY-MM-DD')
    return (displayChangeDate)? 
      <div className='text-center pb-2'>
        <span className='text-black bg-gray-100 rounded-md px-2 py-1 text-sm'>
          { formatToString(date, 'DD/MM/YYYY') }
        </span>
      </div> : undefined
  }

  useEffect(() => {
    tempDate = ''
  }, [messages])

  return (
    <div className="w-full h-full">
      { messages.map((message, key) => (
          <div key={ key }>
            { changeDateTitle(message.date) }
            <MessageInline message={ message } />
          </div>
        )) }
    </div>
  )
}