import Footer from './Footer'
import "../material/Event.css"
import NavbarHome from './NavbarHome'
import { useNavigate } from 'react-router-dom';
import { get, getDatabase, ref, child } from "firebase/database";
import { auth, db } from "./Firebase";
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { ethers } from "ethers";
import polygonlogo from "../material/polygon_logo.svg"
import solanalogo from "../material/solana_logo.svg"
import dint from "../material/dintcoin_logo.png"
const Swal = require('sweetalert2');


const ShowTicketBtn = (props) => {
    let navigate = useNavigate();
    if (parseFloat(props.balance) > parseFloat(props.required)) {
        return (
            <>

                <Button variant="primary" onClick={() => navigate('/ticketcreate', { state: { eventid: props.detail.eventId, userid: auth.currentUser.uid } })}>Get Ticket</Button>

            </>)
    }
    else {
        return (
            <>
                <Button variant="primary" onClick={() => alert('Buy Clicked')}>Buy Token</Button>
            </>)
    }
}


const DisplaynetworkLogo = (props) => {
    if (props.networkName == "Polygon") {
        return (<>
            <img src={polygonlogo} alt="" height={"17px"} style={{ marginBottom: "2px" }} />
        </>)
    }
    else if (props.networkName == "Solana") {
        return (<>
            <img src={solanalogo} alt="" height={"17px"} style={{ marginBottom: "2px" }} />
        </>)
    } else {
        return (<>
            <p>token</p>
        </>)
    }
}



const DisplaycryptoLogo = (props) => {
    return (<>
        <img src={dint} alt="" height={"22px"} style={{ marginBottom: "2px" }} />
    </>)
}



const Events = (props) => {
    let navigate = useNavigate();

    const [eventsdata, setEventdata] = useState([])
    const [userBalanceEvent, setUserBalanceEvent] = useState('not connected')

    const getEventsfirebase = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `events/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var events = Object.keys(snapshot.val())
                var eventarray = [];
                for (var i = 0; i < events.length; i++) {
                    eventarray.push(snapshot.val()[events[i]])
                }
                setEventdata(eventarray)
            } else {
                console.log("No data available");
            }

        }).catch((error) => {
            console.error(error);
        });
    }

    const getmetamaskBalance = async () => {

        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts[0]) {
                console.log(accounts[0])
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(accounts[0]);
                const balanceInEth = parseFloat(ethers.utils.formatEther(balance));
                setUserBalanceEvent(balanceInEth.toFixed(4))
                window.isWallet = true;
            }
            window.ethereum.on('chainChanged', async function (chainId) {
                await getmetamaskBalance()
            })

        }
        else{
            Swal.fire({
                title: 'It will required a web3 wallet to use this area of our application',
                text: "Click Here to Install ",
                html:'<a href="https://metamask.io" target="_blank">Click here to install</a>',
                icon: 'error',
                showCancelButton: true,
                cancelButtonColor: '#CBC9C9',
                cancelButtonText: 'Back'
            }).then((result) => {
                if (result.isConfirmed) {
                  
                }
                else {
                    navigate('/', { replace: true })
                }
            })
        }

       
    }

        


        useEffect(() => {
            getmetamaskBalance()
            getEventsfirebase()
        }, [])


        return (
            <>
                <NavbarHome isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} />
                <div id="events">
                    <br /><br />
                    <center> <h1>Events </h1>
                        <h4>User Balance : {userBalanceEvent}</h4></center>
                    <br /><br />
                    <Container>
                        <Row xs={1} md={3} className="g-4">
                            {eventsdata.map((ev, index) => (
                                <>
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={ev.eventPhoto} style={{ height: '200px' }} />
                                            <Card.Body>
                                                <Card.Title><b>{ev.eventName}</b></Card.Title>
                                                <Card.Text>
                                                    {ev.eventDescription}
                                                </Card.Text>
                                                <hr></hr>
                                                <h6>Date  : {ev.eventDate} </h6>
                                                <h6>Start Time  : {ev.eventStartTime} </h6>
                                                <h6>End Time    :  {ev.eventEndTime} </h6>
                                                <h6>Vanue : {ev.venueName} </h6>
                                                <h6>Network : <DisplaynetworkLogo networkName={ev.network} />  </h6>
                                                <h6>required : <b>{ev.balanceRequired} </b> {ev.tokenName} <DisplaycryptoLogo /> </h6>
                                                <br />
                                                <ShowTicketBtn balance={userBalanceEvent} required={ev.balanceRequired} detail={ev} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </>
                            ))
                            }
                        </Row>
                    </Container>
                </div>
                <Footer />
            </>
        )
    }


    export default Events;