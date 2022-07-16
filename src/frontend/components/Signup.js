import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../material/signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase,ref,set } from "firebase/database";
import { initializeApp } from 'firebase/app';
import "firebase/database";
import $ from 'jquery';
import Footer from './Footer'
import NavbarHome from './NavbarHome';
import { Helmet } from "react-helmet"

const Signup = () => {

    let navigate = useNavigate();
    
const [error_msg,setSignErr] = useState('')



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
                    console.log('Registration Success') 
                    const user = auth.currentUser;
                    
                    const database = getDatabase();
                    var userData ={
                        email:email,
                        role:'simple',
                        name:'user',
                        biography:'no biography yet',
                        city:'null',
                        profileImage:'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
                        twitter:'null',
                        instagram:'null',
                        discord:'null'
                    }
                    set(ref(database, 'users/' + user.uid),userData).then(()=>{
                        console.log('profile detail saved')
                    }).catch((e)=>{
                        console.log(e)
                    })
                    navigate('/login/ ')
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

<Helmet>
   
            <title>Sign Up</title>
            <meta name="description" content="Sign Up to Dint"/>
        </Helmet>
<NavbarHome/>


        <div className='login_divs'>
            <div className="container">
                <div className="header">
                <br /><br />
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

                <p id='error_signup'>{error_msg}</p>

                <button id='signup_btn' onClick={signup_sub}>Submit</button>

            </div>
            </div>
            <Footer/>
        </>
    )
}

export default Signup;