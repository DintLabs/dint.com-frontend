import { child, get, getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { getNetworkByUniqueId } from '../web3/utils';
import Footer from './Footer';
import NavbarHome from './NavbarHome';

// const DisplaynetworkLogo = (props: { networkName: string }) => { --nik
//   if (props.networkName === 'Polygon') {
//     return (
//       <>
//         <img src={polygonlogo} alt="" height="17px" style={{ marginBottom: '2px' }} />
//       </>
//     );
//   }
//   if (props.networkName === 'Solana') {
//     return (
//       <>
//         <img src={solanalogo} alt="" height="17px" style={{ marginBottom: '2px' }} />
//       </>
//     );
//   }
//   return (
//     <>
//       <p>token</p>
//     </>
//   );
// };

const DisplaycryptoLogo = (props: { url: string | undefined }) => (
  <>
    <img src={props.url ? props.url : ''} alt="" height="22px" style={{ marginBottom: '2px' }} />
  </>
);

const EventForAll = (props: { logout: () => void; isAdmin: any }) => {
  const [eventsdata, setEventdata] = useState([]);

  const getEventsfirebase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `events/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const events = Object.keys(snapshot.val());
          const eventarray: any = [];
          for (let i = 0; i < events.length; i++) {
            eventarray.push(snapshot.val()[events[i]]);
          }
          setEventdata(eventarray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEventsfirebase();
  }, []);

  return (
    <>
      <Helmet>
        <title>Events</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>
      <NavbarHome
      // iseventpage={true}
      // isloggedin={props.islogin}
      // logout={props.logout}
      // isadmin={props.isAdmin}
      />

      <div id="events">
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="header">
            <h1>Events</h1>
          </div>
        </div>

        <Container>
          <Row xs={1} md={3} className="g-4">
            {eventsdata.map((ev: any, index: number) => (
              <>
                <Col>
                  <Card>
                    <Card.Img variant="top" src={ev.eventPhoto} style={{ height: '200px' }} />
                    <Card.Body>
                      <Card.Title>
                        <b>{ev.eventName}</b>
                      </Card.Title>
                      <Card.Text>{ev.eventDescription}</Card.Text>
                      <hr />
                      <h6>Date: {ev.eventDate} </h6>
                      <h6>Start Time: {ev.eventStartTime} </h6>
                      <h6>End Time: {ev.eventEndTime} </h6>
                      <h6>Venue: {ev.venueName} </h6>
                      <h6>
                        Network: {getNetworkByUniqueId(ev.network)?.name}
                        <img
                          src={getNetworkByUniqueId(ev.network)?.icon}
                          alt={getNetworkByUniqueId(ev.network)?.SYMBOL}
                          className="network_icon"
                        />
                      </h6>
                      <h6>
                        Token Name: {ev.tokenName} <DisplaycryptoLogo url={ev.tokenIcon} />{' '}
                      </h6>
                      <h6>
                        Balance Required: <b> {ev.balanceRequired} </b>{' '}
                      </h6>
                      <br />

                      <Link to="/login/events">
                        <Button>Get Tickets</Button>{' '}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};
export default EventForAll;
