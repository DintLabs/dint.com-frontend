import NavbarHome from './NavbarHome'
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { get, getDatabase, ref, child } from "firebase/database";
import { auth, db } from "./Firebase";
import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'
import polygonlogo from "../material/polygon_logo.svg"
import solanalogo from "../material/solana_logo.svg"
import dint from "../material/dintcoin_logo.png"


const DisplaynetworkLogo =(props) =>{
    if(props.networkName == "Polygon")
    {
        return(<>
            <img src={polygonlogo} alt="" height={"17px"} style={{marginBottom:"2px"}} />
        </>)
    }
    else if(props.networkName == "Solana")
    {
        return(<>
            <img src={solanalogo} alt="" height={"17px"} style={{marginBottom:"2px"}} />
        </>)
    }else{
        return(<>
        <p>token</p>
        </>)
    }
}


const DisplaycryptoLogo =(props) =>{
    return(<>
     <img src={dint} alt="" height={"22px"} style={{marginBottom:"2px"}} />
    </>)
}


const EventForAll = (props) =>{

    const [eventsdata, setEventdata] = useState([])

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

    useEffect(() => {
        getEventsfirebase()
    }, [])

    return(
        <>
        <NavbarHome iseventpage={true} isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} />
       
        <div id="events">
                <br /><br />
                <br /><br />
                <div className="container">
                    <div className="header">
                        <h1>Events</h1>
                       
                    </div>
                    </div>  
                
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
                                            <h6>Date: {ev.eventDate} </h6>
                                            <h6>Start Time: {ev.eventStartTime} </h6>
                                            <h6>End Time:  {ev.eventEndTime} </h6>
                                            <h6>Venue: {ev.venueName} </h6>
                                            <h6>Network: {ev.network}&nbsp; <DisplaynetworkLogo networkName={ev.network}/> </h6>
                                            <h6>Tokens Required: <b> {ev.balanceRequired} </b> {ev.tokenName} <DisplaycryptoLogo /> </h6>
                                            <br />

                                            <Link to="/login/events"> <Button>Get Tickets</Button> </Link>

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
export default EventForAll;