
import { Link, useNavigate } from "react-router-dom";
import '../material/homepage.css';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Bgvideo from "../material/home2.mp4"
import Metamask_icon from "../material/metamask.svg"
import $ from 'jquery';
import { ethers } from "ethers";
const Swal = require('sweetalert2');



const Homepage = () => {
  let navigate = useNavigate();

  var back_to_top = $('#back_to_top');
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 300) {
      $("#header").css("background", "rgba(26, 24, 22, 0.85)");
      back_to_top.addClass('show')
    }
    else {
      $("#header").css("background", "transparent");
      back_to_top.removeClass('show')
    }
  })

  back_to_top.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });




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
      <div>
        {/* ======= Header ======= */}
        <header id="header" className="fixed-top d-flex align-items-center header-transparent" style={{ height: "70px" }}>
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto">
              <h1><a href="https://dint.com"><img src="https://dint.com/assets/img/logos/logo.png" alt="logo" /> </a></h1>
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo"> <a href="https://dint.com"><img src="https://dint.com/assets/img/apple-touch-icon.png " alt="logo" /> </a></li>

                {/* Authentication Links   login and signup buttons are there */}
                {/* <li><a href="https://dint.com/login">Login</a> </li>
                <li><a className="nav-link" href="https://dint.com/register">Join</a></li> */}


                <div className="navlinks"><button id="profile_btn" onClick={openProfile} > <CgProfile size={35} /></button></div>
                <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div>

                <li id='no_effect_li'><Link id='no_effect' to="/marketplace"><button id="mp_btn">Marketplace</button></Link></li>
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










        {/* ======= Hero Section ======= */}
        <section id="hero" className="card-video-banner">
          <div className="hero-container">
            <div className="bg-video-wrap">
              <video src={Bgvideo} loop muted autoPlay>
              </video>
              <div className="overlay" />
              <div className="caption-video">

                <h1>Dint Club Society</h1>
                <center> <p>Revolutionizing The World of Entertainment Through NFTs and Membership Tokens</p></center>
                <a href="https://dint.com/register">  <button className="submit-form btn btn-primary">Join Us</button></a>
              </div>
            </div>
          </div>
        </section>{/* End Hero */}
        <main id="main">
          <section className="email-col animate__animated animate__fadeInLeft">
            <div className="container position-relative">
              <section className="title">
                <h2 style={{ textAlign: 'center' }}> <strong>
                  <br /><br />
                  Ownership of a Dint Clubber Key Collection NFT grants you lifetime access to Dint Music Festival as well as member-only benefits. Each key can be bought, sold, or traded.</strong></h2>
                <a href="https://i7kxtaeuba6.typeform.com/to/nS1Y8Btu"><button className="submit-form btn btn-primary">Apply To Join Our Whitelist Now!</button></a>
              </section>
            </div>
          </section>
        </main>{/* End #main */}
        {/* ======= Footer ======= */}
        <footer id="footer" className="animate__animated animate__fadeInUp">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="https://dint.com"> <img src="https://dint.com/assets/img/logos/logo.png" alt="logo" /></a>
                <p />
              </div>
              <div className="col-md-3">
                <h3 />
              </div>
              <div className="col-md-3">
                <h3>About Us</h3>
                <ul>
                  <li>
                    <a href="https://dint.com/contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
              </div>
            </div>
          </div>



          <a id="back_to_top"></a>


        </footer>{/* End Footer */}
        <div className="social-links animate__animated animate__fadeInUp">
          <a href="https://discord.gg/zk97Vf4YyX" className="discord" target="_blank"><i className="bi bi-discord"></i></a>
          <a href="https://twitter.com/dint" className="twitter" target="_blank"><i className="bi bi-twitter"></i></a>
          <a href="https://www.instagram.com/dint" className="instagram" target="_blank"><i className="bi bi-instagram"></i></a>
          <a href="https://www.youtube.com/channel/UCGXYFkXyYYIZIjOyjDQ6S7w" className="youtube" target="_blank"><i className="bi bi-youtube"></i></a>
          <div className="copyright">
            © Copyright <strong><span>Dint Club Society</span></strong>. All Rights Reserved
          </div>
        </div>
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
        {/* The Modal */}
        <div className="modal animate__animated animate__fadeInUp" id="myModal">
          <div className="modal-dialog model-waitlist">
            <div className="modal-content">
              <img src="https://dint.com/assets/img/apple-touch-icon.png " alt="Dint Logo" className="model-logo" />
              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">At last, a debit card worth waiting for!</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              {/* Modal body */}
              <div className="modal-body">
                <p>The Dint Card lets you spend crypto, fiat, gold and more at nearly 50 million merchants worldwide. Join our waitlist today.</p>
                <div className="form-group">
                  <form action="https://dint.us14.list-manage.com/subscribe/post?u=65d603d3453722100d5218f87&id=59936c8234" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div className="indicates-required"><span className="asterisk" /></div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL"><span className="asterisk" />
                        </label>
                        <input type="email" defaultValue name="EMAIL" className="form-control email-for-model" id="mce-EMAIL" />
                      </div>
                      <div id="mce-responses" className="clear foot">
                        <div className="response" id="mce-error-response" style={{ display: 'none' }} />
                        <div className="response" id="mce-success-response" style={{ display: 'none' }} />
                      </div>    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="b_65d603d3453722100d5218f87_59936c8234" tabIndex={-1} defaultValue /></div>
                      <div className="optionalParent">
                        <div className="clear footd">
                          <button type="submit" className="btn btn-primary join-now">Join Now</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <p>By joining, you accept our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
              </div>
              {/*End mc_embed_signup*/}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Homepage