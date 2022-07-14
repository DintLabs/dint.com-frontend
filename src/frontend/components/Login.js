import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { get, child, ref } from "firebase/database";
import $ from 'jquery';
import Footer from './Footer'
import NavbarHome from './NavbarHome';
import { auth, db } from './Firebase'


const Login = (props) => {

    var previousPage = window.location.pathname.split('/');

    let navigate = useNavigate();

    const [error_msg_login, setLoginErr] = useState('')

    const loginClicked = () => {
        var login_email = $('#login_email').val();
        var login_password = $('#login_password').val();

        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithEmailAndPassword(auth, login_email, login_password)
                .then((userCredential) => {

                    
                    // sessionStorage.setItem('logged', true);
                    // sessionStorage.setItem('user_email', login_email);

                    props.loginStateChange()
                    props.setemail(login_email)

                    // for get role of loggedin user
                    get(child(ref(db), `users/${userCredential.user.uid}/role`)).then((snapshot) => {
                        // sessionStorage.setItem('role',snapshot.val())
                        if (snapshot.val() == 'admin') {
                            props.isadmin()
                        }
                    }).catch((e) => {
                        alert(e)
                        console.log(e)
                    })

                    if (previousPage[2] == "undefined") {
                        navigate("/")
                    }
                    else {
                        navigate("/" + previousPage[2])
                    }
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
                    props.loginStateChange()
                    props.setemail(user.email)
                    // sessionStorage.setItem('logged', true);
                    // sessionStorage.setItem('user_email', user.email);
                    navigate("/" + previousPage[2])

                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    alert.log(errorMessage)

                });
        }).catch((e) => { alert(e) })
    }
    const fbSignin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                props.loginStateChange()
                props.setemail(user.email)
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    const appleSignin = () => {
        const provider = new OAuthProvider('apple.com');
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                console.log(user)
                props.loginStateChange()
                props.setemail(user.email)
                // Apple credential
                const credential = OAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                const idToken = credential.idToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The credential that was used.
                const credential = OAuthProvider.credentialFromError(error);

                // ...
            });

    }



    return (
        <>
            <NavbarHome />
            <br></br>
            <br></br>
            <br></br>
            <div className='login_divs'>
                <div className="container">
                    <div className="header">
                        <h2>Login</h2>
                        <h1>{props.islogin}</h1>
                    </div>

                    <div className="form-control">
                        <label htmlFor="username">Email</label>
                        <input type="email" placeholder="Email" id="login_email" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="username">Password</label>
                        <input type="password" placeholder="Password" id="login_password" />
                        <button id="forgotpassBtn" onClick={forgotPassClicked}> <span id="forgotPassText">Forgot Password?</span>  </button>
                    </div>

                    <p id='error_signup'>{error_msg_login}</p>
                    <button id='signup_btn' onClick={loginClicked}>Submit</button>

                    <p id="signup_line">  Not registered Yet? <Link to="/signup"> <span id='signup_here'> Sign Up</span></Link></p>
                    <center>
                       
                        <button onClick={googleSignin} className="authbtnsocial" style={{ backgroundColor: 'red' }}>Google</button>
                      
                    </center>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Login