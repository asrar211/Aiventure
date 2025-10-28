import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Form } from './pages/Form.tsx'
import { Itinerary } from './pages/Itinerary.tsx'
import { Error } from './pages/Error.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error />,
  },
  {
    path: '/form',
    element: <Form/>
  },
  {
    path: '/itinerary',
    element: <Itinerary/> 
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
