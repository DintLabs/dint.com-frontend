
import '../material/login.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword,setPersistence,browserSessionPersistence  } from "firebase/auth";
import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import $ from 'jquery';
import Footer from './Footer'
import NavbarHome from './NavbarHome';
import {auth} from './Firebase'


const Login = () => {
 
    var previousPage = window.location.pathname.split('/');

    let navigate = useNavigate();
    
    const [error_msg_login, setLoginErr] = useState('')
  
    const loginClicked = () => {
        var login_email = $('#login_email').val();
        var login_password = $('#login_password').val();


        setPersistence(auth, browserSessionPersistence).then(() =>{

       

        signInWithEmailAndPassword(auth, login_email, login_password)
            .then((userCredential) => {
                console.log(userCredential)
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('user_email', login_email);
                // change this for changing navigate path after login
                    navigate("/"+previousPage[2])
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
        }).catch((e)=>{
            alert(e.message)
        })
    }

    return (
        <>

        <NavbarHome/>
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