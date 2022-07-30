import { authInstance } from 'frontend/contexts/FirebaseInstance';
import useAuth from 'frontend/hooks/useAuth';
import $ from 'jquery';
import { Dropdown } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MetamaskLogin from '../../components/MetamaskLogin';
import blacklogo from '../../material/black.png';
import '../../material/Event.css';
import mainlogo from '../../material/white.png';

const MainNavBar = () => {
  // var isLoggedin = props.isloggedin;
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const { pathname } = useLocation();
  const isEventsPage = pathname === '/events';

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      window.location.reload();
      navigate('/');
    } catch (ex) {
      console.log(ex, 'Error occurred in onLogout');
    }
  };

  const EditProfile = () => {
    navigate('/profile');
  };

  // const select = (el: string, all = false) => { -- NIK
  //   el = el.trim();
  //   if (all) {
  //     return [...document.querySelectorAll(el)];
  //   }
  //   return document.querySelector(el);
  // };

  const mobile_nav = () => {
    // select('#navbar').classList.toggle('navbar-mobile'); -- nik
    $('#navbar_icon').toggleClass('bi-list');
    $('#navbar_icon').toggleClass('bi-x');
  };

  return (
    <>
      <div id="event_nav" style={{ marginTop: '60px' }}>
        <header
          id="header"
          className="fixed-top d-flex align-items-center "
          style={{ height: '80px' }}
        >
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto" style={{ display: 'flex' }}>
              {/* <Link to={'/'}><h1 ><img src={mainlogo}  height="50px" className="" alt="" />  </h1></Link> */}
              <Link to="/">
                <h1>
                  <img src={mainlogo} alt="logo" id="logo_homepage" />{' '}
                </h1>
              </Link>
              {isEventsPage ? (
                <>
                  &nbsp; <h2 style={{ color: 'white', margin: '0' }}>&nbsp;</h2>
                </>
              ) : (
                <></>
              )}
            </div>
            <nav id="navbar" className="navbar order-lg-0">
              <ul>
                <li className="mobile-logo">
                  <Link to="/">
                    <img src={blacklogo} width="40" height="40" className="" alt="" />
                  </Link>
                </li>

                {isAdmin ? (
                  <li className="no_effect_li">
                    <Link to="/admin" style={{ padding: 0 }}>
                      Admin
                    </Link>
                  </li>
                ) : (
                  ''
                )}

                {isAuthenticated ? (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/events" state={{ from: 'events' }}>
                      Events
                    </Link>
                  </li>
                ) : (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/event" state={{ from: 'events' }}>
                      Events
                    </Link>
                  </li>
                )}
                {/* <li id='no_effect_li'><Link id='no_effect' to="/marketplace">Marketplace</Link></li>     */}

                {isAuthenticated ? (
                  <>
                    {/* <div className="navlinks"></div> */}
                    <div className="profile_hide_mobile">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <button id="profile_btn" type="button">
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
                    </div>

                    <div className="profile_hide_pc">
                      <li className="no_effect_li">
                        <Link id="no_effect" to="/profile ">
                          Profile
                        </Link>
                      </li>
                    </div>

                    {/* wallet */}
                    <div className="navlinks">
                      <MetamaskLogin />
                    </div>

                    <div className="profile_hide_pc">
                      <li className="no_effect_li">
                        <Link id="no_effect" to="/login/ " onClick={onLogout}>
                          Logout
                        </Link>
                      </li>
                    </div>
                  </>
                ) : (
                  <>
                    <li className="no_effect_li">
                      <Link id="no_effect" to="/auth/login/ ">
                        Login
                      </Link>
                    </li>
                    <li className="no_effect_li">
                      <Link id="no_effect" to="/signup">
                        Sign Up
                      </Link>
                    </li>

                    <li className="no_effect_li">
                      <button
                        type="button"
                        onClick={() => navigate('/login/')}
                        style={{ background: 'transparent', border: '0', color: 'white' }}
                      >
                        {' '}
                        <MdOutlineAccountBalanceWallet size={35} />{' '}
                      </button>
                    </li>
                  </>
                )}
              </ul>

              <div onClick={mobile_nav} aria-hidden="true">
                <i className="bi bi-list mobile-nav-toggle" id="navbar_icon" />
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
};

export default MainNavBar;
