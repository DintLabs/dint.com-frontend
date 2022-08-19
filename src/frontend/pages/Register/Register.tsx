// @ts-nocheck
/* eslint-disable */
import useAuth from 'frontend/hooks/useAuth';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../../material/signup.css';
import { generateFromEmail } from 'frontend/utils';

// @ts-ignore
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error_msg, setSignErr] = useState('');

  // Initialize Firebase

  const signup_sub = async () => {
    if (email === confirmEmail) {
      if (password === confirmPassword) {
        try {
          // email and password matched Successfully
          const userData = {
            email,
            role: 'simple',
            biography: 'no biography yet',
            name: 'user',
            city: '',
            profileImage:
              'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
            twitter: '',
            instagram: '',
            discord: ''
          };

          await register(email, password, userData);
          const user = window.userData;
          const username = generateFromEmail(user.email);
          const userData2 = {
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
          await axios
            .post(`${process.env.REACT_APP_API_URL}/api/auth/sign-up/`, userData2)
            // @ts-ignore
            .then(({ data }) => {
              console.log(data);
              localStorage.setItem('apiToken', data.data.token);
              localStorage.setItem('userData', JSON.stringify(data.data));
              window.location.reload();
            })
            // @ts-ignore
            .catch((err) => {
              console.log(err);
            });
        } catch (error: any) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              const newLocal = `Email address already in use.`;
              console.log(newLocal);
              setSignErr('Email Address is Already in use, Try Another');
              break;
            case 'auth/invalid-email':
              console.log(`Email address is invalid.`);
              setSignErr('Email is Invalid');
              break;
            case 'auth/operation-not-allowed':
              console.log(`Error during sign up.`);
              setSignErr('Error in Registration');
              break;
            case 'auth/weak-password':
              console.log(
                'Password is not strong enough. Add additional characters including special characters and numbers.'
              );
              setSignErr('Minimum 6 characters are Required For Password');
              break;
            default:
              alert(error.message);
              break;
          }
        }
      } else {
        console.warn('password not match');
        setSignErr('Password and Confirm Password is Not Matching!, Check it Again');
      }
    } else {
      console.warn('email not match');
      setSignErr('Email and Confirm-Email Is Not Matching!, Check it Again');
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up to Dint" />
      </Helmet>

      <br />
      <div className="login_divs">
        <div className="container">
          <div className="header">
            <br />
            <br />
            <h1>Sign Up</h1>
          </div>

          <div className="form-control">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Confirm Email</label>
            <input
              type="email"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e: any) => setConfirmEmail(e.target.value)}
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
          </div>
          <div className="form-control">
            <label htmlFor="username">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
          </div>

          <p id="error_signup">{error_msg}</p>

          <button id="signup_btn" type="button" onClick={signup_sub}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
