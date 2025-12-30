import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Root from './Root'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import About from './Pages/About';

const routing = createBrowserRouter([
  {
    path: '/'
    , element: <Root />,
    children: [
      { path: "login", element: <Login /> }, 
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={routing} />
  </StrictMode>,
)
