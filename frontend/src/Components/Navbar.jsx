import { Link, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { 
  LogOut, 
  LayoutDashboard, 
  Home, 
  Info, 
  CandlestickChart, 
  BarChart3, 
  Brain, 
  GitCompare,
  Briefcase,
  Trophy
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from '../Assets/logo.jpg'

const Navbar = () => {
  const navigate = useNavigate()
  const user = auth.currentUser

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getUserInitials = () => {
    if (!user?.email) return 'U'
    return user.email.charAt(0).toUpperCase()
  }

  const navLinkClass = (isActive) => 
    `group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled: opacity-50 ${
      isActive ?  'bg-accent text-accent-foreground' : ''
    }`

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="LaganiLens Logo" className="w-12 h-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-gray-950 to-gray-600 bg-clip-text text-transparent h-8">
              LaganiLens
            </span>
          </Link>

          {/* Navigation Links and Auth - Right */}
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavLink to="/">
                    {({ isActive }) => (
                      <NavigationMenuLink className={navLinkClass(isActive)}>
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </NavigationMenuLink>
                    )}
                  </NavLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavLink to="/about">
                    {({ isActive }) => (
                      <NavigationMenuLink className={navLinkClass(isActive)}>
                        <Info className="mr-2 h-4 w-4" />
                        About
                      </NavigationMenuLink>
                    )}
                  </NavLink>
                </NavigationMenuItem>

                {user && (
                  <>
                    <NavigationMenuItem>
                      <NavLink to="/homepage">
                        {({ isActive }) => (
                          <NavigationMenuLink className={navLinkClass(isActive)}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </NavigationMenuLink>
                        )}
                      </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavLink to="/analysis">
                        {({ isActive }) => (
                          <NavigationMenuLink className={navLinkClass(isActive)}>
                            <CandlestickChart className="mr-2 h-4 w-4" />
                            Charts
                          </NavigationMenuLink>
                        )}
                      </NavLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavLink to="/predictstock">
                        {({ isActive }) => (
                          <NavigationMenuLink className={navLinkClass(isActive)}>
                            <Brain className="mr-2 h-4 w-4" />
                            Predict
                          </NavigationMenuLink>
                        )}
                      </NavLink>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-primary/10">
                        <AvatarImage src={user.photoURL || undefined} alt={user.email || 'User'} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
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
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/analysis')} className="cursor-pointer">
                      <CandlestickChart className="mr-2 h-4 w-4" />
                      Stock Analysis
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/predictstock')} className="cursor-pointer">
                      <Brain className="mr-2 h-4 w-4" />
                      AI Predictions
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/comparestocks')} className="cursor-pointer">
                      <GitCompare className="mr-2 h-4 w-4" />
                      Compare Stocks
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => navigate('/portfolio')} className="cursor-pointer">
                      <Briefcase className="mr-2 h-4 w-4" />
                      My Portfolio
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => navigate('/leaderboard')} className="cursor-pointer">
                      <Trophy className="mr-2 h-4 w-4" />
                      Leaderboard
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <NavLink to="/login">Login</NavLink>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-black to-gray-500 hover:from-white hover:to-black">
                    <NavLink to="/signup">Sign Up</NavLink>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar