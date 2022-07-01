import {useState} from 'react';
import '../material/signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import $ from 'jquery';

const Signup = () => {
    
const [error_msg,setSignErr] = useState('')


      // // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyAEeo_gs2YjZb_2SVCowrA0y_WHSoqg71E",
        authDomain: "dint-3d4ac.firebaseapp.com",
        databaseURL: "https://dint-3d4ac-default-rtdb.firebaseio.com",
        projectId: "dint-3d4ac",
        storageBucket: "dint-3d4ac.appspot.com",
        messagingSenderId: "249686432294",
        appId: "1:249686432294:web:6a939362861134f09264e7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);



    const signup_sub = () => {
        var email = $('#email').val()
        var c_email = $('#confirm_email').val()
        var password = $('#password').val()
        var c_password = $('#confirm_password').val()

        if (email == c_email) {
            if (password == c_password) {
                // email and password matched Successfully
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Registration Success') 
                })
                .catch((error) => {
                    const errorCode = error.code;

                    switch (error.code) {
                        case 'auth/email-already-in-use':
                          console.log(`Email address already in use.`);
                          setSignErr('Email Address is Already in use, Try Another')
                          break;
                        case 'auth/invalid-email':
                          console.log(`Email address is invalid.`);
                          setSignErr('Email is Invalid')
                          break;
                        case 'auth/operation-not-allowed':
                          console.log(`Error during sign up.`);
                          setSignErr('Error in Registration')
                          break;
                        case 'auth/weak-password':
                          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                          setSignErr('Minimum 6 characters are Required For Password')
                          break;
                        default:
                          alert(error.message);
   
                          break;
                      }
                });
            }
            else {
                console.warn('password not match')
                setSignErr('Password and Confirm Password is Not Matching!, Check it Again')
            }
        }
        else {
            console.warn('email not match')
            setSignErr('Email and Confirm-Email Is Not Matching!, Check it Again')
        }
    }




    return (
        <>
            <div className="container">
                <div className="header">
                    <h2>Create Account</h2>
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

                <p id='error_signup'>{error_msg}</p>

                <button id='signup_btn' onClick={signup_sub}>Submit</button>

            </div>
        </>
    )
}

export default Signup;