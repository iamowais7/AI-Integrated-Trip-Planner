import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter} from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]'
import Mytrips from './my-trip'
import Help from './help'
import Chat from './chat'
import FAQs from './faqs'

const router = createBrowserRouter([
  {
    path:'/',
    element : <App/>
  },
  {
    path:'/create-trip',
    element: <CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<Mytrips/>
  },
  {
    path:'/help',
    element:<Help/>
  },
   {
    path:'/chat',
    element:<Chat/>
  },
   {
    path:'/faqs',
    element:<FAQs/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
    <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
