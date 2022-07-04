
import '../material/login.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import $ from 'jquery';
import Footer from './Footer'
import NavbarEvents from './NavbarEvents';

const Login = () => {
    
   

    let navigate = useNavigate();
    const [error_msg_login, setLoginErr] = useState('')
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
    const auth = getAuth();
    const loginClicked = () => {
        var login_email = $('#login_email').val();
        var login_password = $('#login_password').val();

        signInWithEmailAndPassword(auth, login_email, login_password)
            .then((userCredential) => {
                console.log('success')
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('user_email', login_email);
                // change this for changing navigate path after login
                navigate("/")
                
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/user-not-found':
                        console.log(`User is Not Found`);
                        setLoginErr('User Not Found')
                        break;
                    case 'auth/wrong-password':
                        console.log(`Wrong Password`);
                        setLoginErr("Wrong Password")
                        break;
                    default:
                        console.log(error.message);
                        setLoginErr('Something Went Wrong')
                        break;
                }
            });
    }

    return (
        <>

        <NavbarEvents/>
             <div className='login_divs'>
       <div className="container">
                <div className="header">
                    <h2>Login</h2>
                </div>

                <div className="form-control">
                    <label htmlFor="username">Email</label>
                    <input type="text" placeholder="Email"  id="login_email" />
                    

                </div>
                <div className="form-control">
                    <label htmlFor="username">Password</label>
                    <input type="password" placeholder="Password" id="login_password" />
                   
                </div>
          

                <p id='error_signup'>{error_msg_login}</p>

                <button id='signup_btn' onClick={loginClicked}>Submit</button>
                

              <p id="signup_line">  Not registered Yet? <Link to="/signup"> <span id='signup_here'> SignUp Here</span></Link></p>
            </div>


            </div>
        <Footer/>
        </>
    )
}

export default Login