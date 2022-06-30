import {Link} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import mainlogo from '../material/white.png';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import $ from 'jquery';

import "../material/navbar.css";

const Navigation = ({ web3Handler, account }) => {
  

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
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="outline-light">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>
                            </Nav.Link>
                        ) : (
                            <>
                                {/* <Link as={Link} to="/marketplace/my-purchases" className="navlinks"><CgProfile size={35}/></Link> */}

                                {/* <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div> */}

                                <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}




export default Navigation;