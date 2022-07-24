import QRCode from 'react-qr-code';
import {useState} from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarHome from './NavbarHome'
import '../material/tickets.css'
import {ref, set,update } from "firebase/database";
import { db } from "./Firebase";



const TicketCreate = (props) =>{
    const [randomNum,setRandomNum] = useState(Math.floor((Math.random() * 100000) + 999999))
    let location = useLocation()

   var ticketData = {
        Userid: location.state.userid ,
        Eventid:location.state.eventid,
        Authid: randomNum
    }

    useEffect(()=>{
        intervalfunc()
        set(ref(db, `tickets/${location.state.userid}`), ticketData).then(() => {
            console.log('Ticket creation done')
         }).catch((e) => {
             console.log(e)
             alert('Error in Ticket Create')
         })
    },[])

    const intervalfunc = () =>{
       let n=0;
        setInterval(function() {
            n++;
            let rand = Math.floor((Math.random() * 100000) + 999999)
            setRandomNum(rand)
            updateAuthid(rand)
        }, 60000);
    }

    const updateAuthid =(rand) =>{
        update(ref(db, 'tickets/'+ location.state.userid), {authid:rand}).then(() => {
            console.log('authid update success')
        })
            .catch((error) => {
                alert('error in update' + error)
            });
    }

    return(
        <>
        <NavbarHome isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} setaddress={props.setaddress} setchain={props.setchain} />
        <center> <div id='ticket_parent_div'>
    <h1>Use Dint Scanner</h1>
        <br></br>
        <QRCode value={"Eventid :"+location.state.eventid+", Userid:"+location.state.userid +" authid:"+randomNum} style={{fill:'red'}} />,
        <br></br>
        <br></br>
       <center> <h1>{randomNum}</h1></center>
       <p>For security purposes your ticket regenerates every minute.</p>
        </div></center> 
        </>
    )
}




export default TicketCreate