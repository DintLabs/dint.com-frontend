import { FaDiscord, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import '../../material/Footer.css';
import mainlogo from '../../material/white.png';

const MainFooter = () => (
  <>
    <div>
      <footer style={{ marginTop: '200px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,128L120,154.7C240,181,480,235,720,224C960,213,1200,139,1320,101.3L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          />
        </svg>
        <div className="footer">
          <section>
            <h4 className="footer_link_title" style={{ marginBottom: '30px' }}>
              <img src={mainlogo} id="footer_logo" alt="footer_logo" /> Dint{' '}
            </h4>
            <p id="company_desc_footer">
              Revolutionizing The World of Entertainment Through NFTs and Membership Tokens
            </p>
          </section>

          <section className="middle_on_mobile" />
          <section className="middle_on_mobile" />
          <section className="middle_on_mobile hide_on_leptop">
            <h4 className="footer_link_title"> Community</h4>
            <div className="social_parent">
              <a href="https://twitter.com/dint">
                {' '}
                <div className="social_box" style={{ margin: 0 }}>
                  <FaTwitter size={20} />
                </div>
              </a>
              <a href="https://www.instagram.com/dint">
                {' '}
                <div className="social_box">
                  <FaInstagram size={20} />
                </div>
              </a>
              <a href="https://discord.gg/zk97Vf4YyX">
                {' '}
                <div className="social_box">
                  <FaDiscord size={20} />
                </div>
              </a>
              <a href="https://www.facebook.com/dintclub">
                {' '}
                <div className="social_box">
                  <FaFacebookF size={20} />
                </div>
              </a>
              <a href="https://www.youtube.com/channel/UCGXYFkXyYYIZIjOyjDQ6S7w">
                {' '}
                <div className="social_box">
                  <FaYoutube size={20} />
                </div>
              </a>
            </div>
          </section>
        </div>
      </footer>
      <div className="sub-footer">
        <div className="social_parent" id="leptop_social">
          <a href="https://twitter.com/dint">
            {' '}
            <div className="social_box" style={{ margin: 0 }}>
              <FaTwitter size={20} />
            </div>
          </a>

          <a href="https://www.instagram.com/dint">
            {' '}
            <div className="social_box">
              <FaInstagram size={20} />
            </div>
          </a>
          <a href="https://discord.gg/zk97Vf4YyX">
            {' '}
            <div className="social_box">
              <FaDiscord size={20} />
            </div>
          </a>
          <a href="https://www.facebook.com/dintclub">
            {' '}
            <div className="social_box">
              <FaFacebookF size={20} />
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCGXYFkXyYYIZIjOyjDQ6S7w">
            {' '}
            <div className="social_box">
              <FaYoutube size={20} />
            </div>
          </a>
        </div>
        Copyright ©2022 All rights reserved | dint.com
      </div>
    </div>
  </>
);

export default MainFooter;
