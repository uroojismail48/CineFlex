
import { createRoot } from 'react-dom/client'
import './index.css'
import {store} from './redux/store.js'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
createRoot(document.getElementById('root')).render(

  <ClerkProvider  publishableKey={clerkKey}>
  <Provider store={store} >
  <BrowserRouter>
    <App />
</BrowserRouter>

  </Provider>
  </ClerkProvider>
)
