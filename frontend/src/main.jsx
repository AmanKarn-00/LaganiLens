import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom' // Changed to react-router-dom
import './index.css'

// Layouts
import Layout from './Layout'
import Root from './Root'

// Components
import ProtectedRoute from './Components/ProtectedRoute'

// Public Pages
import Body from './Pages/Body'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'

// Protected Pages
import Homepage from './Pages/Homepage'
import CompareStocksPage from './Pages/Comparstocks'
import StockPredictionPage from './Pages/PredictionPage'
import NepseAnalysis from './Pages/NepseAnalysis' // Added this import

const routing102 = createBrowserRouter([
  {
    // Public Layout (Root.jsx)
    // No "path" here means it wraps the children without adding to the URL
    element: <Root />,
    children: [
      { path: "/", element: <Body /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> }
    ]
  },
  {
    // Protected Layout (Layout.jsx)
    element: <Layout />,
    children: [
      { 
        path: "homepage", 
        element: <ProtectedRoute><Homepage /></ProtectedRoute> 
      },
      { 
        path: "comparestocks", 
        element: <ProtectedRoute><CompareStocksPage /></ProtectedRoute> 
      },
      { 
        path: "predictstock", 
        element: <ProtectedRoute><StockPredictionPage /></ProtectedRoute> 
      },
      { 
        path: "nepse-analysis", // Matches the button in Homepage
        element: <ProtectedRoute><NepseAnalysis /></ProtectedRoute> 
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routing102} />
  </StrictMode>,
)