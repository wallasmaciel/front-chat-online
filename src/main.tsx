import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ChatArea } from './layouts/ChatArea'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: ':user_id',
        element: <ChatArea />,
      },
      {
        path: '*',
        element: (
          <>
            <span className='pb-2'><img src='/vite.svg' alt='whatsapp-icon'/></span>
            <div className='text-center text-black'>
              <p>Chat-online for the Web</p>
              <p>Send and receive messages.</p>
            </div>
          </>
        )
      }, 
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
)
