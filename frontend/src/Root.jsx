import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' 
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const Root = () => {
    const navigate = useNavigate();

    // ✅ 1. Initialize State from LocalStorage (Persistence)
    // This runs only once when the app loads/refreshes
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // ✅ 2. Login Handler (Passed to Login Page)
    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // ✅ 3. Logout Handler (Passed to Navbar)
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login"); // Redirect to login
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Pass user state to Navbar so it shows "Logout" instead of "Login" */}
            <Navbar user={user} onLogout={handleLogout} />
            
            <main className="flex-grow">
                {/* ✅ KEY CHANGE: 
                   We pass the user and login function through 'context'.
                   Your Login/Signup pages will receive these functions via this context.
                */}
                <Outlet context={{ user, handleLogin, handleLogout }} />
            </main>
            
            <Footer />
        </div>
    )
}

export default Root