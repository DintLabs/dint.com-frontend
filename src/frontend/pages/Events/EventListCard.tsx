import { IEvent } from 'frontend/types/event';
import { Button, Card, Col } from 'react-bootstrap';
import '../../material/Event.css';
import { getNetworkByUniqueId } from '../../web3/utils';

const EventListCard = ({
  objEvent,
  getMetamaskBalance
}: {
  objEvent: IEvent;
  getMetamaskBalance: (selectedEvent: IEvent) => void;
}) => (
  <Col>
    <Card>
      <Card.Img variant="top" src={objEvent.eventPhoto} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>
          <b>{objEvent.eventName}</b>
        </Card.Title>
        <Card.Text>{objEvent.eventDescription}</Card.Text>
        <hr />
        <h6>Date: {objEvent.eventDate} </h6>
        <h6>Start Time: {objEvent.eventStartTime} </h6>
        <h6>End Time: {objEvent.eventEndTime} </h6>
        <h6>Venue: {objEvent.venueName} </h6>
        <h6>
          Network: {getNetworkByUniqueId(objEvent.network)?.name}
          <img
            src={getNetworkByUniqueId(objEvent.network)?.icon}
            alt={getNetworkByUniqueId(objEvent.network)?.SYMBOL}
            className="network_icon"
          />
        </h6>
        <h6>
          Token Name: {objEvent.tokenName}
          <img
            src={objEvent.tokenIcon ? objEvent.tokenIcon : ''}
            alt=""
            height="22px"
            style={{ marginBottom: '2px' }}
          />
        </h6>
        <h6>
          Balance Required: <b> {objEvent.balanceRequired} </b>
        </h6>
        <br />
        <Button
          variant="primary"
          onClick={() => {
            getMetamaskBalance(objEvent);
          }}
        >
          More Details
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

export default EventListCard;
