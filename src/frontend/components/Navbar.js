import {Link} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import mainlogo from '../material/white.png';




const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" id="navmain">
            <Container>
                <Link to="/">
                    <Navbar.Brand >
                        <img src={mainlogo} width="40" height="40" className="" alt="" />
                        &nbsp; Dint 
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