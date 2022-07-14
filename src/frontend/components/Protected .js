import { Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from "./Firebase";
import { ref, get, child } from "firebase/database";
import $ from 'jquery';
import { onAuthStateChanged } from "firebase/auth";
const Swal = require('sweetalert2');



const Protected = (props) => {


    var Page_req = props.cmp;
    var pagename = props.pagename;
    // var isLoggedin = props.islogin;
    const [isLoggedin, setLogin] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setLogin(true)

            } else {
                console.log('logout user')
                Swal.fire({
                    title: 'You Are Not Logged In',
                    text: "Click login button to Login ",
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#CBC9C9',
                    confirmButtonText: 'Login',
                    cancelButtonText: 'Back'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login/' + pagename)
                    }
                    else {
                        navigate('/', { replace: true })
                    }
                })
            }
        });
    }, [])

    let navigate = useNavigate();


    if (!isLoggedin) {

        // Swal.fire({
        //     title: 'You Are Not Logged In',
        //     text: "Click login button to Login ",
        //     icon: 'error',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#CBC9C9',
        //     confirmButtonText: 'Login',
        //     cancelButtonText: 'Back'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         navigate('/login/' + pagename)
        //     }
        //     else {
        //         navigate('/', { replace: true })
        //     }
        // })
    }




    return (
        <>
            <Page_req userEmail={props.userEmail} logout={props.logout} isAdmin={props.isAdmin} islogin={props.islogin} />
        </>
    )




}


export default Protected 