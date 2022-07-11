import QRCode from 'react-qr-code';
import {useState} from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarHome from './NavbarHome'
import '../material/tickets.css'
import { get, getDatabase, ref, set,update, child, collection } from "firebase/database";
import { db } from "./Firebase";



const TicketCreate = (props) =>{
    const [randomNum,setRandomNum] = useState(Math.floor((Math.random() * 100000) + 999999))
    let location = useLocation()

    
   var ticketData = {
        userid: location.state.userid ,
        eventid:location.state.eventid,
        authid:randomNum
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
            console.log(n)
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
        <NavbarHome isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} />
        <div id='ticket_parent_div'>
        <h1>Ticket Create </h1>
        <br></br>
        <QRCode value={"Eventid :"+location.state.eventid+", Userid:"+location.state.userid +" authid:"+randomNum} style={{fill:'red'}} />,
        <br></br>
        <br></br>
       <center> <h1>{randomNum}</h1></center>
      
        </div>
        </>
    )
}

export default TicketCreate