import { ChatInline } from './components/ChatInline'
import { TextInputSimple } from './components/TextInputSimple'
import { ChatArea } from './layouts/ChatArea'
import { ScrollArea } from './layouts/ScrollArea'
import './assets/css/App.css'

function App() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='flex-1 max-h-screen max-w-sm bg-slate-300'>
        <div className='m-1'>
          <TextInputSimple placeholder="Pesquisar uma conversa" />
        </div>
        <ScrollArea className='h-full pb-4 availableChats'>
          { [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(value => <ChatInline key={ value } userId={ value.toString() } />) }
        </ScrollArea>
      </div>
      <div className='flex-1 flex bg-zinc-400'>
        <ChatArea />
      </div>
    </div>
  )
}

export default App
