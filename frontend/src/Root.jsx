import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router'

const Root = () => {
    return (

        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Root
