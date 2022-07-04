import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import mainlogo from '../material/white.png';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import $ from 'jquery';
import Metamask_icon from "../material/metamask.svg"
const Swal = require('sweetalert2');


const Navigation = ({ web3Handler, account }) => {
    const openNav = () => {
        $('#mySidenav').css("width", "350px");
        $('#main').css("margin-left", '350px')
       
    }
    const closeNav = () => {
        $('#mySidenav').css("width", "0");
        $('#main').css("margin-left", '0')
        $('body').css("background-color", 'white')
    }

    const other_wallet_clicked = () => {
        Swal.fire({
            title: 'Sorry',
            text: 'Currently We Have Only Metamask, Other Wallets Are Coming Soon',
            icon: 'warning',
            confirmButtonText: 'Close',
        })
    }

    const openProfile = () => {
        Swal.fire({
          title: 'Profile',
          text: 'Only for test',
          icon: 'question',
          confirmButtonText: 'Close',
        })
      }


    return (
        <Navbar expand="lg" bg="dark" variant="dark" id="navmain">
            <Container>
                <Link to="/">
                    <Navbar.Brand >
                        <img src={mainlogo} width="40" height="40" className="" alt="" />
                        &nbsp; Dint Marketplace
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/marketplace/" className="navlinks">Home</Nav.Link>
                        <Nav.Link as={Link} to="/marketplace/create" className="navlinks">Create</Nav.Link>
                        <Nav.Link as={Link} to="/marketplace/my-listed-items" className="navlinks">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/marketplace/my-purchases" className="navlinks">My Purchases</Nav.Link>
                    </Nav>
                    <div id="nav_last_part">
                        {account ? (
                            <>
                                <Nav.Link
                                    href={`https://etherscan.io/address/${account}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button nav-button btn-sm mx-4">
                                    <Button variant="outline-light">
                                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                    </Button>
                                </Nav.Link>
                                <div className="navlinks"><button id="profile_btn" onClick={openProfile}  > <CgProfile size={35} /></button></div>
                            </>
                        ) : (
                            <>
                                <div className="navlinks"><button id="wallet_btn" onClick={openNav} > <MdOutlineAccountBalanceWallet size={35} /></button></div>

                                <div className="navlinks"><button id="profile_btn" onClick={openProfile}  > <CgProfile size={35} /></button></div>


                                <div id="mySidenav" className="sidenav">
                                    <button className="closebtn" onClick={closeNav}>×</button>
                                    <div id="sidenav_child">
                                        <div id="sidenav_top_div">
                                            <CgProfile size={35} /> <div > <p>Connect Wallet</p></div>
                                        </div>
                                        <div id="wallets_parent_div">
                                            <div className="wallets_div" onClick={web3Handler}><img src={Metamask_icon}></img>  <p>Metamask</p></div>
                                            <div className="wallets_div last_wallet" onClick={other_wallet_clicked}> <p>Other Wallets</p></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button> */}
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}




export default Navigation;