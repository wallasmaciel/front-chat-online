import { useEffect, ReactNode } from 'react'
import { addDay, formatToString } from "../../../utils/date.util"
import { Message, MessageInline } from "../../MessageInline"

interface ChatAreaMessagesProps {
  messages: Message[], 
}
export function ChatAreaMessages({ messages }: ChatAreaMessagesProps) {
  let dateNow: Date = new Date()
  let tempDate: string

  function changeDateTitle(date: Date): ReactNode | undefined {
    let displayChangeDate: boolean = tempDate != formatToString(date, 'YYYY-MM-DD')
    tempDate = formatToString(date, 'YYYY-MM-DD')

    function getCustomDateStr() {
      let result = formatToString(date, 'DD/MM/YYYY');
      if (result == formatToString(dateNow, 'DD/MM/YYYY')) return 'Today'
      if (result == formatToString(addDay(dateNow, -1), 'DD/MM/YYYY')) return 'Yesterday'
      // 
      return result
    }
    return (displayChangeDate)? 
      <div className='text-center pb-2'>
        <span className='text-black font-thin bg-gray-100 rounded-md px-2 py-1 text-xs'>
          { getCustomDateStr() }
        </span>
      </div> : undefined
  }

  useEffect(() => {
    tempDate = ''
  }, [messages])

  return (
    <div className="w-full h-full">
      { messages.filter((value, index, self) => index === self.indexOf(value)).map((message, key) => (
          <div key={ key }>
            { changeDateTitle(message.date) }
            <MessageInline message={ message } />
          </div>
        )) }
    </div>
  )
}