import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './Layout'
import Root from './Root'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import About from './Pages/About'
import Body from './Pages/Body'
import Homepage from './Pages/Homepage';
import ProtectedRoute from './Components/ProtectedRoute'
import ResetPassword from './Components/ResetPassword';


const routing102 = createBrowserRouter([
  {
    path: '/'
    , element: <Root />,
    children: [
      { path: "", element: < Body/> }, 
      { path: "login", element: <Login /> }, 
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword />}
    ]
  },
  {
    path: '/'
    , element: <Layout />,
    children: [
      { path: "homepage", element:<ProtectedRoute><Homepage /></ProtectedRoute>  }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={routing102} />
  </StrictMode>,
)
