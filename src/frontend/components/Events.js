import Footer from './Footer'
import Navbar from './MarketplaceNavbar'
import { Link } from 'react-router-dom'
import "../material/Event.css"
import mainlogo from '../material/white.png';
import NavbarHome from './NavbarHome'
import { useNavigate } from 'react-router-dom';
import { get, getDatabase, ref, set, child, collection } from "firebase/database";
import { db } from "./Firebase";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Card, Button, CardGroup, Row, Col, Container } from 'react-bootstrap';

const Events = () => {
    let navigate = useNavigate();

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



    return (
        <>

            <NavbarHome />

            <div id="events">


<br/><br/>

                <center> <h1>Events</h1></center>
                <br/><br/>
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
                                            <h6>Vanue Name : {ev.venueName} </h6>
                                            <br />
                                            <Button variant="primary" onClick={()=>navigate('/ticketcreate')}>Get Ticket</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* <Card style={{ width: '18rem' }} key={index}>
                            <Card.Img variant="top" src={ev.eventPhoto} style={{height:'150px'},{width:'200px'}}/>
                            <Card.Body>
                                <Card.Title>{ev.eventName}</Card.Title>
                                <Card.Text>
                                    {ev.eventDescription}
                                </Card.Text>
                                <Card.Text>
                                    {ev.eventStartTime}
                                </Card.Text>
                                <Card.Text>
                                    {ev.eventEndTime}
                                </Card.Text>
                                <Card.Text>
                                    {ev.eventDate}
                                </Card.Text>
                                <Card.Text>
                                    {ev.venueName}
                                </Card.Text>
                                <Button variant="primary">Get Ticket</Button>
                            </Card.Body>
                        </Card> */}
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