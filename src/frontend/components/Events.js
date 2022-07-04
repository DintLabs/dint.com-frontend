import Footer from './Footer'
import Navbar from './MarketplaceNavbar'
import { Link } from 'react-router-dom'
import "../material/Event.css"
import mainlogo from '../material/white.png';
import NavbarEvents from './NavbarEvents'

const Events = () => {
    return (
        <>

           <NavbarEvents />

            <div id="events">
                <h1>Welcome To Dint Club's Event</h1>
            </div>

            <Footer />
        </>
    )
}

export default Events;