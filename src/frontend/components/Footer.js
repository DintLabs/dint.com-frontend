
import "../material/Footer.css"
import { GoTriangleRight } from "react-icons/go";
import { FaTwitter, FaInstagram, FaFacebookF, FaDiscord, FaYoutube } from "react-icons/fa";
import mainlogo from '../material/white.png';

const Footer = () => {

    return (
        <>
            <div>
                <footer>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#000000" fill-opacity="1" d="M0,128L120,154.7C240,181,480,235,720,224C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                    </svg>
                    <div className="footer">
                        <section >
                            <h4 className="footer_link_title" style={{ marginBottom: '30px' }}><img src={mainlogo} id="footer_logo"></img> Dint club </h4>
                            <p id="company_desc_footer">Dint Club Society presents Dint Music Festival, an annual outdoor electronic music festival.</p>
                        </section>
                        <section className="middle_on_mobile">
                            <h4 className="footer_link_title">Company</h4>
                            <a href="#"><GoTriangleRight /> &nbsp; Home</a>
                            <a href="#"><GoTriangleRight /> &nbsp; About Us</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Blog</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Contact Us</a>
                        </section>
                        <section className="middle_on_mobile">
                            <h4 className="footer_link_title">My Account</h4>
                            <a href="#"><GoTriangleRight /> &nbsp; Profile</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Favourite </a>
                            <a href="#"><GoTriangleRight /> &nbsp; collections</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Watchlist</a>
                        </section>
                        <section className="middle_on_mobile">
                            <h4 className="footer_link_title">Other</h4>
                            <a href="#"><GoTriangleRight /> &nbsp; Privacy Policy</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Terms &amp; Conditions</a>
                            <a href="#"><GoTriangleRight /> &nbsp; Cookie Policy</a>
                        </section>
                        <section className="middle_on_mobile hide_on_leptop">
                            <h4 className="footer_link_title"> Community</h4>
                            <div className="social_parent">
                                <div className="social_box" style={{ "margin": 0 }}><FaTwitter size={20} /></div>
                                <div className="social_box"><FaInstagram size={20} /></div>
                                <div className="social_box"><FaDiscord size={20} /></div>
                                <div className="social_box"><FaFacebookF size={20} /></div>
                                <div className="social_box"><FaYoutube size={20} /></div>
                            </div>
                        </section>
                    </div>
                </footer>
                <div className="sub-footer">
                   
                        <div className="social_parent" id="leptop_social">
                            <div className="social_box" style={{ "margin": 0 }}><FaTwitter size={20} /></div>
                            <div className="social_box"><FaInstagram size={20} /></div>
                            <div className="social_box"><FaDiscord size={20} /></div>
                            <div className="social_box"><FaFacebookF size={20} /></div>
                            <div className="social_box"><FaYoutube size={20} /></div>
                        </div>
                   
                    Copyright ©2022 All rights reserved | dint.com
                </div>
            </div>

        </>
    )
}


export default Footer;