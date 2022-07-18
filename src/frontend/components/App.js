import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Events from './Events.js';
import Profile from './Profile.js';
import { useState } from 'react';
import TicketCreate from './TicketCreate.js';
import Routes_Marketplace from './Routes_Marketplace.js';
import Protected from './Protected ';
import AdminProtaction from './AdminProtaction';
import EventForAll from './EventForAll.js';
import './App.css';


function App() {

  const [loggedin, setLoggedin] = useState(false)
  const [isadmin, setisAdmin] = useState(false)
  const [userEmail, setuserEmail] = useState('')
  const [chainId, serChainId] = useState('')
  const [WalletAddress, setWalletAddress] = useState('')


  const setLogintrue = () => { setLoggedin(true) }

  const setLoginfalse = () => {setLoggedin(false)}

  const setAdmin = () => {setisAdmin(true)}

  const setEmail = (email) => {setuserEmail(email)}

  const setmychainId =(chainId) =>{serChainId(chainId)}

  const setmywalletaddress =(address) =>{setWalletAddress(address)}


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" element={<Home logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin}  />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/buytoken" element={<h1>Buy Ticket</h1>} />

        {/*Events Page For Non Loggedin Users*/}
        <Route path="/event" element={<EventForAll logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin} />} />

        {/* Login Page Route */}
        <Route path="/login/*" element={<Login islogin={loggedin} loginStateChange={setLogintrue} logout={setLoginfalse} isadmin={setAdmin} setemail={setEmail} />} />

        {/* if You Want to Make Any Page Password Protacted with Login Then Do Routing Like This */}
        <Route path="/marketplace/*" element={<Routes_Marketplace  logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin} />} />

        <Route path="/events" element={<Protected cmp={Events} logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin} /> } />

        <Route path="/profile" element={<Protected cmp={Profile} pagename="profile" logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin} />}  />

        <Route path="/ticketcreate" element={<Protected cmp={TicketCreate} pagename="ticketcreate"  logout={setLoginfalse} isAdmin={isadmin}  islogin={loggedin} />} />

        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminProtaction loggedin={loggedin} isAdmin={isadmin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
