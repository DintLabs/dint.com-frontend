import { Link,useNavigate } from 'react-router-dom'
import "../material/Event.css"
import { CgProfile } from "react-icons/cg";
import $ from 'jquery';
import { Dropdown } from 'react-bootstrap';
import MetamaskLogin from "./MetamaskLogin";
import {auth} from './Firebase'

const NavbarHome = (props) =>{
  var isLoggedin = props.isloggedin;
  let navigate = useNavigate();
     const logout = () => {
      auth.signOut().then(()=>{
        alert('logout success')
        props.logout()
        window.location.reload()
      }).catch((e)=>{
        console.log(e)
      })
    // sessionStorage.removeItem("logged");
    navigate('/')
  }

  const EditProfile = () =>{
    navigate('/profile')
  }
    /**
     * Easy selector helper function
     */

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
      $("#navbar_icon").classList.toggle("bi-list");
      $("#navbar_icon").classList.toggle("bi-x");
    }
 
  
   
    return (
        <>
        <div id="event_nav" style={{marginTop:'60px'}}>
        <header id="header" className="fixed-top d-flex align-items-center " style={{height:'80px'}} >
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto" style={{display:'flex'}}>
            <Link to={'/'}><h1><img src="https://dint.com/assets/img/logos/logo.png" alt="logo" id="logo_homepage" /> </h1></Link>
            {props.iseventpage ?
            <>
            &nbsp; &nbsp; <h2 style={{color:"white",margin:"0"}}>Dint Events</h2>
            </>
            :  
            <></>
          }
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo"> <a href="https://dint.com"><img src="https://dint.com/assets/img/apple-touch-icon.png " alt="logo" /> </a></li>


              {props.isadmin ? <Link to="/admin">Admin</Link> : '' }


                {isLoggedin ?
                  <li id='no_effect_li'><Link id='no_effect' to="/events" state={{ from: "events" }}>Events</Link></li>
                  :
                  <li id='no_effect_li'><Link id='no_effect' to="/event" state={{ from: "events" }}>Events</Link></li>

                }
                <li id='no_effect_li'><Link id='no_effect' to="/marketplace">Marketplace</Link></li>



                {isLoggedin ? <>
                  {/* <div className="navlinks"></div> */}
                  <Dropdown>
                    <Dropdown.Toggle  id="dropdown-basic" style={{backgroundColor:'transparent',border:0,marginLeft:'15px'}}>

                  <button id="profile_btn">
                    <CgProfile size={35} />
                    </button>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item  style={{color:'black'}} onClick={EditProfile}>Edit Profile</Dropdown.Item>
                      <Dropdown.Item  style={{color:'black'}} onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>


                  {/* wallet */}
                  <div className="navlinks">
                    <MetamaskLogin />
                    </div>
                 
                </> :
                  <>
                    <li id='no_effect_li'><Link id='no_effect' to="/login/ ">login</Link></li>
                    <li id='no_effect_li'><Link id='no_effect' to="/signup">Signup</Link></li>
                  </>
                }

              </ul>
              <i className="bi bi-list mobile-nav-toggle" id='navbar_icon' onClick={mobile_nav} />

            </nav>{/* .navbar */}
          </div>
        </header>{/* End Header */}
      </div>
      </>
    )
}


export default NavbarHome