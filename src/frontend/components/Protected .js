import { Route, useNavigate } from 'react-router-dom';
import {auth, db } from "./Firebase";
import {ref,get,child} from "firebase/database";
import $ from 'jquery';
import Admin from './Admin';
const Swal = require('sweetalert2');



const Protected = props => {
    let navigate = useNavigate();
    var Page_req = props.cmp;
    var pagename = props.pagename;
    var isLoggedin = sessionStorage.getItem("logged");


    // get(child(ref(db), `users/${auth.currentUser.uid}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       alert(snapshot.val().role)
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });



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
        }).then((result) =>{
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