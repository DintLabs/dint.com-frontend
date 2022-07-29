import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import $ from 'jquery';
import { onAuthStateChanged } from 'firebase/auth';
import { FaLaptopHouse } from 'react-icons/fa';
import Metamask_icon from '../material/metamask.svg';
import MetamaskLogin from './MetamaskLogin';
import { auth } from './Firebase';
import mainlogo from '../material/white.png';

const Swal = require('sweetalert2');

const Navigation = ({ web3Handler, account }) => {
  const [islogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        alert('logout success');
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const EditProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        setLogin(true);
      } else {
      }
    });
  });

  return (
    <Navbar expand="lg" bg="dark" variant="dark" id="navmain">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={mainlogo} width="40" height="40" className="" alt="" />
            &nbsp; Dint Marketplace
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/marketplace/" className="navlinks">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/create" className="navlinks">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/my-listed-items" className="navlinks">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/marketplace/my-purchases" className="navlinks">
              My Purchases
            </Nav.Link>
          </Nav>
          <div id="nav_last_part">
            {islogin ? (
              <>
                {/* <div className="navlinks"></div> */}
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{ backgroundColor: 'transparent', border: 0, marginLeft: '15px' }}
                  >
                    <button id="profile_btn">
                      <CgProfile size={35} />
                    </button>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item style={{ color: 'black' }} onClick={EditProfile}>
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item style={{ color: 'black' }} onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* wallet */}
                <MetamaskLogin />
                {/* <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div>
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
                                </div> */}
              </>
            ) : (
              <>
                <div>
                  {' '}
                  <Link id="no_effect" to="/login/marketplace">
                    login
                  </Link>
                </div>

                <div>
                  <Link id="no_effect" to="/signup" style={{ marginLeft: '15px' }}>
                    Signup
                  </Link>
                </div>
              </>
            )}
            {/* {account ? (
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
                                
                            </>
                        )} */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
