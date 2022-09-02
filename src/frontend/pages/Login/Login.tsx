/* eslint-disable */
// @ts-nocheck
import {
  browserSessionPersistence,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';
import axios from 'axios';
import { authInstance } from 'frontend/contexts/FirebaseInstance';
import useAuth from 'frontend/hooks/useAuth';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import '../../material/signup.css';
import { generateFromEmail } from 'frontend/utils';
import { toast } from 'react-toastify';
// @ts-ignore

const Login = () => {
  const { login, user } = useAuth();
  const location: Location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { redirectUrl }: any = location.state ? location.state : {};
  // console.log(redirectUrl);
  const auth = getAuth();
  const navigate = useNavigate();

  getRedirectResult(auth)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // @ts-ignore
      if (result?.user == null) return;
      const { user } = result;
      // alert(JSON)
      const username = generateFromEmail(user.email);
      const userData = {
        ...user,
        fire_base_auth_key: user?.uid,
        role: 'simple',
        biography: 'no biography yet',
        custom_username: username ?? '',
        profile_image:
          user?.photoURL ??
          'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
        display_name: user?.displayName ?? ''
      };
      console.log(userData);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email: user.email,
          fire_base_auth_key: user.uid
        })
        .then(async ({ data }: any) => {
          if (data.code !== 400) {
            localStorage.setItem('apiToken', data.data.token);
            localStorage.setItem('userData', JSON.stringify(data.data));
            toast.success('User Login Successful!');
            navigate('/lounge');
          } else {
            await axios
              .post(`${process.env.REACT_APP_API_URL}/api/auth/sign-up/`, userData)
              .then(async ({ data }) => {
                if (data.code !== 400) {
                  localStorage.setItem('apiToken', data.data.token);
                  localStorage.setItem('userData', JSON.stringify(data.data));
                  toast.success('User Login Successful!');
                  navigate('/lounge');
                } else {
                  toast.error('User Not Found');
                }
              });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    })
    .catch((error) => {
      alert(error);
    });

  const [error_msg_login, setLoginErr] = useState('');

  const loginClicked = async () => {
    try {
      await setPersistence(authInstance, browserSessionPersistence);
      const data = await login(email, password);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email,
          fire_base_auth_key: data.user.uid
        })
        .then(({ data }: any) => {
          if (data.code === 400) {
            toast.error('Invalid Credantials');
          } else {
            localStorage.setItem('apiToken', data.data.token);
            localStorage.setItem('userData', JSON.stringify(data.data));
            toast.success('User Login Successful!');
            navigate('/lounge');
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`User is Not Found`);
        setLoginErr('User Not Found');
      } else if (error.code === 'auth/wrong-password') {
        console.log(`Wrong Password`);
        setLoginErr('Wrong Password');
      } else if (error.message) {
        console.log(error.message);
        setLoginErr('Something Went Wrong');
      } else {
        alert('Email is empty');
        console.error(error);
      }
    }
  };

  const forgotPassClicked = () => {
    if (email !== '') {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Email Sent');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
      await setPersistence(authInstance, browserSessionPersistence);
      signInWithRedirect(auth, provider)
        .then(() => {})
        .catch((e) => console.log(e));
    } else {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const { user } = result;

          const username = generateFromEmail(user.email);
          const userData = {
            ...user,
            fire_base_auth_key: user?.uid,
            role: 'simple',
            biography: 'no biography yet',
            custom_username: username ?? '',
            profile_image:
              user?.photoURL ??
              'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
            display_name: user?.displayName ?? ''
          };
          console.log(userData);
          await axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
              email: user.email,
              fire_base_auth_key: user.uid
            })
            .then(async ({ data }: any) => {
              console.log(user.email, user.uid);
              if (data.code !== 400) {
                localStorage.setItem('apiToken', data.data.token);
                localStorage.setItem('userData', JSON.stringify(data.data));
                toast.success('User Login Successful!');
                navigate('/lounge');
              } else {
                await axios
                  .post(`${process.env.REACT_APP_API_URL}/api/auth/sign-up/`, userData)
                  .then(async ({ data }) => {
                    if (data.code !== 400) {
                      localStorage.setItem('apiToken', data.data.token);
                      localStorage.setItem('userData', JSON.stringify(data.data));
                      toast.success('User Login Successful!');
                      navigate('/lounge');
                    }
                  });
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
          // if (redirectUrl) {
          //   navigate(redirectUrl);
          // } else {
          //   navigate('/lounge');
          // }
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  // const fbSignin = () => {
  //   const provider = new FacebookAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const { user } = result;
  //       console.log(user);
  //       props.loginStateChange();
  //       props.setemail(user.email);
  //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       const { accessToken } = credential;

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const { email } = error.customData;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);

  //       // ...
  //     });
  // };

  // const appleSignin = () => {
  //   const provider = new OAuthProvider('apple.com');
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const { user } = result;

  //       console.log(user);
  //       props.loginStateChange();
  //       props.setemail(user.email);
  //       // Apple credential
  //       // const credential = OAuthProvider.credentialFromResult(result);
  //       // const { accessToken } = credential;
  //       // const { idToken } = credential;

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const { email } = error.customData;
  //       // The credential that was used.
  //       const credential = OAuthProvider.credentialFromError(error);

  //       // ...
  //     });
  // };

  // useEffect(() => {
  //   onAuthStateChanged(authInstance, (user) => {
  //     if (user) {
  //       navigate(redirectUrl);
  //     } else {
  //       console.log('user is not loggedin');
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to Dint" />
      </Helmet>
      {/* <NavbarHome /> */}
      <br />
      <br />
      <div className="login_divs">
        <div className="container">
          <div className="header">
            <h1>Login</h1>
            {/* <h1>{props.islogin}</h1> */}
          </div>

          <div className="form-control">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <button id="forgotpassBtn" type="button" onClick={forgotPassClicked}>
              <span id="forgotPassText">Forgot Password?</span>{' '}
            </button>
          </div>

          <p id="error_signup">{error_msg_login}</p>
          <button id="signup_btn" type="button" onClick={loginClicked}>
            Submit
          </button>

          <p id="signup_line">
            Not registered Yet?{' '}
            <Link to="/auth/signup">
              <span id="signup_here"> Sign Up</span>
            </Link>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
              type="button"
              onClick={googleSignin}
              className="authbtnsocial"
              style={{ backgroundColor: 'red' }}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
