import { Link, useNavigate } from 'react-router-dom'
import "../material/Event.css"
import { CgProfile } from "react-icons/cg";
import $ from 'jquery';
import { Dropdown } from 'react-bootstrap';
import MetamaskLogin from "./MetamaskLogin";
import { useEffect, useState } from 'react';
import { auth } from './Firebase'
import { onAuthStateChanged } from "firebase/auth";
import mainlogo from '../material/white.png';
import blacklogo from '../material/black.png';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";


const NavbarHome = (props) => {
  // var isLoggedin = props.isloggedin;

  const [isLoggedin, setIsLogin] = useState(false)

  let navigate = useNavigate();

  const logout = () => {
    auth.signOut().then(() => {
      alert('logout success')
      props.logout()
      window.location.reload()
    }).catch((e) => {
      console.log(e)
    })
    // sessionStorage.removeItem("logged");
    navigate('/')
  }

  const EditProfile = () => {
    navigate('/profile')
  }


  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };


  const mobile_nav = () => {
    select("#navbar").classList.toggle("navbar-mobile");
    $("#navbar_icon").toggleClass("bi-list");
    $("#navbar_icon").toggleClass("bi-x");
  }



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLogin(true)
      } else { }
    })
  })


  return (
    <>

      <div id="event_nav" style={{ marginTop: '60px' }}>
        <header id="header" className="fixed-top d-flex align-items-center " style={{ height: '80px' }} >
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto" style={{ display: 'flex' }}>
              {/* <Link to={'/'}><h1 ><img src={mainlogo}  height="50px" className="" alt="" />  </h1></Link> */}
              <Link to={'/'}><h1><img src={mainlogo}  alt="logo" id="logo_homepage" /> </h1></Link>
              {props.iseventpage ?
                <>
                  &nbsp; &nbsp; <h2 style={{ color: "white", margin: "0" }} ></h2>
                </>
                :
                <></>
              }
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo">
                  <Link to="/">
                    <img src={blacklogo} width="40" height="40" className="" alt="" />
                 
                  </Link>
                </li>


                {props.isadmin ? <li className='no_effect_li'><Link to="/admin" style={{ padding: 0 }}>Admin</Link></li> : ''}


                {isLoggedin ?
                  <li className='no_effect_li'><Link id='no_effect' to="/events" state={{ from: "events" }}>Events</Link></li>
                  :
                  <li className='no_effect_li'><Link id='no_effect' to="/event" state={{ from: "events" }}>Events</Link></li>

                }
                {/* <li id='no_effect_li'><Link id='no_effect' to="/marketplace">Marketplace</Link></li>     */}



                {isLoggedin ? <>
                  {/* <div className="navlinks"></div> */}
                  <div className='profile_hide_mobile'>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic" >

                        <button id="profile_btn">
                          <CgProfile size={35} />
                        </button>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item style={{ color: 'black' }} onClick={EditProfile}>Edit Profile</Dropdown.Item>
                        <Dropdown.Item style={{ color: 'black' }} onClick={logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className='profile_hide_pc'>
                    <li className='no_effect_li'><Link id='no_effect' to="/profile ">Profile</Link></li>
                  </div>


                  {/* wallet */}
                  <div className="navlinks">
                    <MetamaskLogin />
                  </div>

                  <div className='profile_hide_pc'>
                    <li className='no_effect_li'><Link id='no_effect' to="/login/ " onClick={logout}>Logout</Link></li>
                  </div>
                </> :
                  <>
                    <li className='no_effect_li'><Link id='no_effect' to="/login/ ">Login</Link></li>
                    <li className='no_effect_li'><Link id='no_effect' to="/signup">Sign Up</Link></li>
                    
                    <li className='no_effect_li'><button onClick={()=>navigate('/login/')} style={{background:"transparent", border:"0",color:"white"}}> <MdOutlineAccountBalanceWallet size={35} /> </button>
                    </li>

                  </>
                }

              </ul>

              <i className="bi bi-list mobile-nav-toggle" id='navbar_icon' onClick={mobile_nav} />

            </nav>
          </div>
        </header>
      </div>
    </>
  )
}


export default NavbarHome