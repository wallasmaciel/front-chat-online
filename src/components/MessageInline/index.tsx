import { useAppSelector } from "../../app/hooks"
import { formatToString } from "../../utils/date.util"

export interface Message {
  to: string,
  from: string,
  content: string,
  date: Date,
}

interface MessageInlineProps {
  message: Message,
}
export function MessageInline(props: MessageInlineProps) {
  const user = useAppSelector(state => state.userReducer.value)
  return (
    <div className={ `px-3 mb-2 w-full flex ${user?.id == props.message.to? 'justify-end' : 'justify-start'}` }>
      <div className={ `${user?.id == props.message.to? 'bg-sky-700' : 'bg-sky-600'} rounded-md w-80 py-1 px-2` }>
        <p className="text-base text-slate-200">{ props.message.content }</p>
        <div className="text-xs text-right text-slate-200/60">
          { `${formatToString(props.message.date, 'HH:mm')}` }
        </div>
      </div>
    </div>
  )
}