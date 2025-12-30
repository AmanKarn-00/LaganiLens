import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <NavLink to='/about' className="text-black">About</NavLink>
      <NavLink to='/login' className="text-black">Login</NavLink>
      <NavLink to='/signup' className="text-black">Signup</NavLink>
    </div>
  )
}

export default Navbar
