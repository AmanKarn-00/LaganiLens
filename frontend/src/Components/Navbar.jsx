import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LogOut, LayoutDashboard, Home, Info, Moon, Sun, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Use your alias for assets
import logo from '@/Assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // 1. Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // 2. Initialize Dark Mode from Local Storage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // 3. Toggle Dark Mode Function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      sessionStorage.clear()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getUserInitials = () => {
    if (!user?.email) return 'U'
    return user.email.charAt(0).toUpperCase()
  }

  // Helper for NavLink styles
  const navLinkClasses = ({ isActive }) => 
    cn(
      navigationMenuTriggerStyle(),
      "bg-transparent cursor-pointer transition-colors",
      isActive && "bg-accent text-accent-foreground dark:bg-gray-800 dark:text-white"
    )

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="LaganiLens Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              LaganiLens
            </span>
          </Link>

          {/* NAVIGATION LINKS */}
          <div className="flex items-center gap-4">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <NavLink to="/" className={navLinkClasses}>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <NavLink to="/about" className={navLinkClasses}>
                      <Info className="mr-2 h-4 w-4" />
                      About
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <NavLink to="/homepage" className={navLinkClasses}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2">
              
              {/* PUBLIC DARK MODE TOGGLE */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode} 
                className="rounded-full hover:bg-accent dark:hover:bg-gray-800"
                aria-label="Toggle Theme"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500 transition-all" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-700 transition-all" />
                )}
              </Button>

              {user ? (
                /* LOGGED IN: User Dropdown */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-visible:ring-0">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={user.photoURL} alt={user.email} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/homepage')} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* LOGGED OUT: Auth Buttons */
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild className="hidden sm:inline-flex">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar