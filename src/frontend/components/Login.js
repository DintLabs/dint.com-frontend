import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  set ,get,child,ref} from "firebase/database";
import $ from 'jquery';
import Footer from './Footer'
import NavbarHome from './NavbarHome';
import { auth,db } from './Firebase'


const Login = () => {

    var previousPage = window.location.pathname.split('/');

    let navigate = useNavigate();

    const [error_msg_login, setLoginErr] = useState('')

    const loginClicked = () => {
        var login_email = $('#login_email').val();
        var login_password = $('#login_password').val();


        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, login_email, login_password)
                .then((userCredential) => {
                    sessionStorage.setItem('logged', true);
                    sessionStorage.setItem('user_email', login_email);
                    // change this for changing navigate path after login

                    get(child(ref(db), `users/${userCredential.user.uid}/role`)).then((snapshot) => {
                        console.log(snapshot.val())
                        sessionStorage.setItem('role',snapshot.val())
                        console.log('session saved')
                    }).catch((e)=>{
                        alert(e)
                        console.log(e)
                    })

                    navigate("/" + previousPage[2])
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
        }).catch((e) => {
            alert(e.message)
        })
    }



    const forgotPassClicked = () => {
        var login_email = $('#login_email').val();
        if (login_email !== "") {
            const auth = getAuth();
            sendPasswordResetEmail(auth, login_email)
                .then(() => {
                    alert('Email Sent')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    // ..
                });
        }
        else {
            alert('Email is empty')
        }

    }



    const googleSignin = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('user_email', user.email);
                navigate("/" + previousPage[2])
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert.log(errorMessage)
                
            });
        }).catch((e)=>{alert(e)})
    }





    return (
        <>

            <NavbarHome />
            <div className='login_divs'>
                <div className="container">
                    <div className="header">
                        <h2>Login</h2>
                    </div>

                    <div className="form-control">
                        <label htmlFor="username">Email</label>
                        <input type="email" placeholder="Email" id="login_email" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="username">Password</label>
                        <input type="password" placeholder="Password" id="login_password" />
                        <button id="forgotpassBtn" onClick={forgotPassClicked}> <span id="forgotPassText">forgot Password?</span>  </button>
                    </div>

                    <p id='error_signup'>{error_msg_login}</p>

                    <button id='signup_btn' onClick={loginClicked}>Submit</button>


                    <p id="signup_line">  Not registered Yet? <Link to="/signup"> <span id='signup_here'> SignUp Here</span></Link></p>

                    <button onClick={googleSignin}>Google</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login