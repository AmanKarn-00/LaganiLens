import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Button } from './ui/button'


const Navbar = () => {
  const navigate = useNavigate()
  const user = auth.currentUser
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
      setMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg font-bold text-xl shadow-lg transform group-hover:scale-105 transition-transform">
              LaganiLens
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 shadow-sm' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              About
            </NavLink>
            {user ? (
              <>
                <NavLink 
                  to="/homepage" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <Button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in border-t border-gray-200 mt-2">
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              About
            </NavLink>
            {user ? (
              <>
                <NavLink 
                  to="/homepage" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all text-center"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
