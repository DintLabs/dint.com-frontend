// @ts-nocheck
/* eslint-disable */
import useAuth from 'frontend/hooks/useAuth';
import $ from 'jquery';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MetamaskLogin from '../../components/MetamaskLogin';
import blacklogo from '../../material/black.png';
import '../../material/Event.css';
import mainlogo from '../../material/white.png';

const MainNavBar = () => {
  // var isLoggedin = props.isloggedin;
  const { logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('storage', checkAuth);
    checkAuth();
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const checkAuth = (e) => {
    // this.setState({ auth: true });
    const apiToken = localStorage.getItem('apiToken');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData ?? '{}');
    if (apiToken?.length > 0 && userData) {
      setIsAuthenticated(true);
    }
  };

  const { pathname } = useLocation();
  const isEventsPage = pathname === '/events';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate('/');
      dispatch({ type: 'RESET_STORE' });
    } catch (e) {
      console.log('Error occurred in onLogout', e.message);
    }
  };

  const EditProfile = () => {
    navigate('/profile');
  };

  const navigateOnCreatePage = () => {
    navigate('/page/creation');
  };

  const navigateOnViewPage = () => {
    navigate('/page/Test-page');
  };

  const select = (el: string, all = false): any => {
    el = el.trim();
    if (all) {
      return [...(document as any).querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  const mobile_nav = () => {
    select('#navbar').classList.toggle('navbar-mobile');
    $('#navbar_icon').toggleClass('bi-list');
    $('#navbar_icon').toggleClass('bi-x');
  };

  React.useEffect(() => {
    $('#navbar li').on('click', () => {
      if ($('#navbar').hasClass('navbar-mobile')) {
        mobile_nav();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="event_nav" style={{ marginTop: '80px' }}>
        <header
          id="header"
          className="fixed-top d-flex align-items-center "
          style={{ height: '80px' }}
        >
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo me-auto" style={{ display: 'flex' }}>
              {/* <Link to={'/'}><h1 ><img src={mainlogo}  height="50px" className="" alt="" />  </h1></Link> */}
              <Link to={isAuthenticated ? '/lounge' : '/'}>
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

                {/* {isAdmin ? (
                  <li className="no_effect_li">
                    <Link to="/admin" style={{ padding: 0 }}>
                      Admin
                    </Link>
                  </li>
                ) : (
                  ''
                )} */}
                {isAuthenticated && (
                  <li className="no_effect_li">
                    <Link to="/lounge" style={{ padding: 0 }}>
                      Lounge
                    </Link>
                  </li>
                )}
                {isAuthenticated ? (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/events" state={{ from: 'events' }}>
                      Events
                    </Link>
                  </li>
                ) : (
                  <li className="no_effect_li">
                    <Link id="no_effect" to="/public/events" state={{ from: 'events' }}>
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
                          <span id="profile_btn">
                            <CgProfile size={35} />
                          </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item style={{ color: 'black' }} onClick={EditProfile}>
                            Edit Profile
                          </Dropdown.Item>
                          <Dropdown.Item style={{ color: 'black' }} onClick={navigateOnCreatePage}>
                            Create Page
                          </Dropdown.Item>
                          <Dropdown.Item style={{ color: 'black' }} onClick={navigateOnViewPage}>
                            View Page
                          </Dropdown.Item>
                          <Dropdown.Item style={{ color: 'black' }} onClick={onLogout}>
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
                        <a id="no_effect" onClick={onLogout}>
                          Logout
                        </a>
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
                      <Link id="no_effect" to="/auth/signup">
                        Sign Up
                      </Link>
                    </li>

                    <li className="no_effect_li">
                      <button
                        type="button"
                        onClick={() => navigate('/auth/login')}
                        style={{ background: 'transparent', border: '0', color: 'white' }}
                      >
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
