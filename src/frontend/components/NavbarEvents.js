
import { Link,useNavigate } from 'react-router-dom'
import "../material/Event.css"
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import mainlogo from '../material/white.png';
import { CgProfile } from "react-icons/cg";
import Metamask_icon from "../material/metamask.svg"
import $ from 'jquery';
import { ethers } from "ethers";
const Swal = require('sweetalert2');

const NavbarEvents = () =>{

    let navigate = useNavigate();


  
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
  
    const connectMetamask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts[0]) {
          closeNav();
          Swal.fire({
            title: 'Metamask Connected Successfully',
            confirmButtonText: 'Go To Marketplace',
            icon:'success',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              navigate("/marketplace");
            } 
          })
        }
        else {
          alert('connection problem')
        }
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()
        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        })
        window.ethereum.on('accountsChanged', async function (accounts) {
          await connectMetamask()
        })
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'Metamask is not installed',
          icon: 'error',
          confirmButtonText: 'Close',
          footer: '<a href="https://metamask.io/">Click Here to Install Metamask </a>'
        })
      }
    }

    return (
        <>
        <div id="event_nav" style={{marginTop:'60px'}}>
        <header id="header" className="fixed-top d-flex align-items-center " style={{ height: "70px" }}>
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto">
              <h1><Link to='/'><img src="images/logo.png" alt="logo" /> </Link></h1>
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo"> <a href="https://dint.com"><img src="https://dint.com/assets/img/apple-touch-icon.png " alt="logo" /> </a></li>

                {/* Authentication Links   login and signup buttons are there */}
                {/* <li><a href="https://dint.com/login">Login</a> </li>
                <li><a className="nav-link" href="https://dint.com/register">Join</a></li> */}



                <li id='no_effect_li'><Link id='no_effect' to="/events">Events</Link></li> 
                <li id='no_effect_li'><Link id='no_effect' to="/marketplace">Marketplace</Link></li>

                <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div>
                
                <div className="navlinks"><button id="profile_btn" onClick={openProfile} > <CgProfile size={35} /></button></div>



              </ul>
              <i className="bi bi-list mobile-nav-toggle" id='navbar_icon' onClick={mobile_nav} />

              {/*  Code of Sidebar */}
              <div id="mySidenav" className="sidenav">
                <button className="closebtn" onClick={closeNav}>×</button>

                <div id="sidenav_child">
                  <div id="sidenav_top_div">
                    <CgProfile size={35} /> <div > <p>Connect Wallet</p></div>
                  </div>
                  <div id="wallets_parent_div">
                    <div className="wallets_div" onClick={connectMetamask}><img src={Metamask_icon}></img>  <p>Metamask</p></div>
                    <div className="wallets_div last_wallet" onClick={other_wallet_clicked}> <p>Other Wallets</p></div>
                  </div>
                </div>
              </div>
            </nav>{/* .navbar */}
          </div>
        </header>{/* End Header */}
      </div>
      </>
    )
}


export default NavbarEvents