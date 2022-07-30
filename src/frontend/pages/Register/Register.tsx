/* eslint-disable jsx-a11y/label-has-associated-control */
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { FIREBASE_CONFIG } from 'frontend/config';
import $ from 'jquery';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../../material/signup.css';

const Register = () => {
  const navigate = useNavigate();

  const [error_msg, setSignErr] = useState('');

  // Initialize Firebase
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = getAuth(app);

  const signup_sub = () => {
    const email = $('#email').val() as string;
    const c_email = $('#confirm_email').val();
    const password = $('#password').val();
    const c_password = $('#confirm_password').val() as string;

    if (email === c_email) {
      if (password === c_password) {
        // email and password matched Successfully
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Registration Success');
            const user = auth.currentUser;
            if (user) {
              const database = getDatabase();
              const userData = {
                email,
                role: 'simple',
                name: 'user',
                biography: 'no biography yet',
                city: 'null',
                profileImage:
                  'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
                twitter: 'null',
                instagram: 'null',
                discord: 'null'
              };
              set(ref(database, `users/${user.uid}`), userData)
                .then(() => {
                  console.log('profile detail saved');
                })
                .catch((e) => {
                  console.log(e);
                });
            }
            navigate('/login/ ');
          })
          .catch((error) => {
            const errorCode = error.code;

            switch (error.code) {
              case 'auth/email-already-in-use':
                console.log(`Email address already in use.`);
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
          });
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
            <input type="text" placeholder="Email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Confirm Email</label>
            <input type="email" placeholder="Confirm Email" id="confirm_email" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Password</label>
            <input type="password" placeholder="Password" id="password" />
          </div>
          <div className="form-control">
            <label htmlFor="username">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" id="confirm_password" />
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
