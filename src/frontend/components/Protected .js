
import { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Login from './Login.js';

const Swal = require('sweetalert2');
const Protected = props => {
    let navigate = useNavigate();
    var Page_req = props.cmp;
    var pagename = props.pagename;
    

    var isLoggedin = sessionStorage.getItem("logged");

    if (!isLoggedin) {
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
                navigate('/login/'+pagename )
            }
            else {
                navigate('/', { replace: true })
            }
        })
    }

    return (
        <>
            <Page_req  />
        </>
    )
}


export default Protected 