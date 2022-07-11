
import { Link,useNavigate } from 'react-router-dom'
import "../material/Event.css"
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import mainlogo from '../material/white.png';
import { CgProfile } from "react-icons/cg";
import Metamask_icon from "../material/metamask.svg"
import $ from 'jquery';
import { ethers } from "ethers";
import { Dropdown } from 'react-bootstrap';
import MetamaskLogin from "./MetamaskLogin";
import {auth} from './Firebase'
const Swal = require('sweetalert2');

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
    const openNav = () => {
      $('#mySidenav').css("width", "350px");
      $('#main').css("margin-left", '350px')
      $('body').css("background-color", 'rgba(0,0,0,0.4)')
    }
    const closeNav = () => {
      $('#mySidenav').css("width", "0");
      $('#main').css("margin-left", '0')
      $('body').css("background-color", 'white')
    }
  
    const openProfile = () =>{
      Swal.fire({
        title: 'Profile',
        text: 'Only for test',
        icon: 'question',
        confirmButtonText: 'Close',
      })
    }
  
    const other_wallet_clicked = () =>{
      Swal.fire({
        title: 'Sorry',
        text: 'Currently We Have Only Metamask, Other Wallets Are Coming Soon',
        icon: 'warning',
        confirmButtonText: 'Close',
      })
    }
  
    // const connectMetamask = async () => {
    //   if (typeof window.ethereum !== 'undefined') {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     if (accounts[0]) {
    //       closeNav();
    //       Swal.fire({
    //         title: 'Metamask Connected Successfully',
    //         confirmButtonText: 'Go To Marketplace',
    //         icon:'success',
    //       }).then((result) => {
    //         /* Read more about isConfirmed, isDenied below */
    //         if (result.isConfirmed) {
    //           navigate("/marketplace");
    //         } 
    //       })
    //     }
    //     else {
    //       alert('connection problem')
    //     }
    //     // Get provider from Metamask
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     // Set signer
    //     const signer = provider.getSigner()
    //     window.ethereum.on('chainChanged', (chainId) => {
    //       window.location.reload();
    //     })
    //     window.ethereum.on('accountsChanged', async function (accounts) {
    //       await connectMetamask()
    //     })
    //   }
    //   else {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'Metamask is not installed',
    //       icon: 'error',
    //       confirmButtonText: 'Close',
    //       footer: '<a href="https://metamask.io/">Click Here to Install Metamask </a>'
    //     })
    //   }
    // }

    return (
        <>
        <div id="event_nav" style={{marginTop:'60px'}}>
        <header id="header" className="fixed-top d-flex align-items-center " style={{height:'80px'}} >
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto">
            <Link to={'/'}><h1><img src="https://dint.com/assets/img/logos/logo.png" alt="logo" id="logo_homepage" /> </h1></Link>
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo"> <a href="https://dint.com"><img src="https://dint.com/assets/img/apple-touch-icon.png " alt="logo" /> </a></li>


              {props.isadmin ? <Link to="/admin">Admin</Link> : '' }


                <li id='no_effect_li'><Link id='no_effect' to="/events" state={{ from: "events" }}>Events</Link></li>
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
                    <MetamaskLogin/>
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