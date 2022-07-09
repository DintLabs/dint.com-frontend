import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Events from './Events.js';
import Profile from './Profile.js';
import Admin from './Admin.js';
import TicketCreate from './TicketCreate.js';
import Routes_Marketplace from './Routes_Marketplace.js';
import Protected  from './Protected ';
import AdminProtaction  from './AdminProtaction';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        {/* if You Want to Make Any Page Password Protacted with Login Then Do Routing Like This */}
        <Route path="/marketplace/*" element={<Routes_Marketplace/>} />
        <Route path="/events" element={<Events/> } />
        <Route path="/profile" element={<Protected  cmp={Profile} pagename="profile" /> } />
        <Route path="/ticketcreate" element={<Protected  cmp={TicketCreate}  pagename="ticketcreate" /> } />



        {/* Admin Login Route */}
        {/* <Route path="/admin" element={<Protected  cmp={Admin}  pagename="admin" /> } /> */}
        <Route path="/admin" element={<AdminProtaction/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
