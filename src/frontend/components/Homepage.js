import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import '../material/homepage.css';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Bgvideo from "../material/home2.mp4"
import $ from 'jquery'
import mainlogo from '../material/white.png';
import blacklogo from '../material/black.png';

const Homepage = () =>{
  
  var back_to_top = $('#back_to_top');

    $(window).scroll(function(){
      var scroll = $(window).scrollTop();
      if (scroll > 300) {
        $("#header").css("background" , "rgba(26, 24, 22, 0.85)");
        back_to_top.addClass('show')
      }
      else{
        $("#header").css("background" , "transparent");  
        back_to_top.removeClass('show')	
      }
    })

    back_to_top.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
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
    }};

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }};

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  

  const mobile_nav = () =>{
    select("#navbar").classList.toggle("navbar-mobile");
    $("#navbar_icon").classList.toggle("bi-list");
    $("#navbar_icon").classList.toggle("bi-x");
  }


  const openNav = ()=> {
    $('#mySidenav').css("width","350px");
    $('#main').css("margin-left",'350px')
    $('body').css("background-color",'rgba(0,0,0,0.4)')
    }
    const closeNav = () => {
        $('#mySidenav').css("width","0");
        $('#main').css("margin-left",'0')
        $('body').css("background-color",'white')
    }

 



    return(
        <>
          <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
                <h1>Hie</h1>
            </div>
        <div>

        {/* ======= Header ======= */}
        <header id="header" className="fixed-top d-flex align-items-center header-transparent" style={{height:"70px"}}>
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto">
              <h1><a href="https://dint.com"><img src="https://dint.com/assets/img/logos/logo.png" alt="logo" /> </a></h1>
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo"> <a href="https://dint.com"> <img src={blacklogo} width="100" height="100" className="" alt="" />  </a></li>
                {/* Authentication Links */}
                <li><a href="https://dint.com/login">Login</a> </li>
                <li><a className="nav-link" href="https://dint.com/register">Join</a></li>

                <div className="navlinks"><button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button></div>

                <li id='no_effect_li'><Link id='no_effect' to="/marketplace"><button id="mp_btn">Marketplace</button></Link></li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle" id='navbar_icon' onClick={mobile_nav} />
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
                <a href="/signup">  <button className="submit-form btn btn-primary">Join Us</button></a>
              </div>
            </div>
          </div>
        </section>{/* End Hero */}
        <main id="main">
          <section className="email-col animate__animated animate__fadeInLeft">
            <div className="container position-relative">
              <section className="title">
                <h2 style={{textAlign: 'center'}}> <strong>
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
                <a href="https://dint.com"> <img src={mainlogo} width="40" height="40" className="" alt="" /></a>
                <p />
              </div>
              <div className="col-md-3">
                <h3 />
              </div>
              <div className="col-md-3">
                  {/* <h3>About Us</h3> */} 
           
                <ul>
                  <li>
                    {/* <a href="https://dint.com/contact">Contact</a> */} 
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
          Copyright ©2022 All rights reserved | dint.com
          </div>          
        </div>
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
        {/* The Modal */}
        <div className="modal animate__animated animate__fadeInUp" id="myModal">
          <div className="modal-dialog model-waitlist">
            <div className="modal-content">
            <img src={blacklogo} width="40" height="40" className="" alt="" />
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
                        <div className="response" id="mce-error-response" style={{display: 'none'}} />
                        <div className="response" id="mce-success-response" style={{display: 'none'}} />
                      </div>    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                      <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_65d603d3453722100d5218f87_59936c8234" tabIndex={-1} defaultValue /></div>
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