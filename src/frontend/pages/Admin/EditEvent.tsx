import { updateAdminEvent } from 'frontend/redux/slices/admin';
import { RootState, useSelector } from 'frontend/redux/store';
import { IEvent } from 'frontend/types/event';
import { IS_TOKEN, OPTIONS_NETWORK_STAD } from 'frontend/utils';
import { NETWORKS } from 'frontend/web3/model';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { fetchTokenDetails } from '../../web3/service';

const EditEvent = ({
  isOpen,
  toggleModal,
  selectedEvent,
  onComplete
}: {
  selectedEvent: IEvent;
  isOpen: boolean;
  toggleModal: () => void;
  onComplete: () => void;
}) => {
  // console.log(selectedEvent);
  const [objEvent, setObjEvent] = useState<IEvent>(selectedEvent);
  const [selectedEventName] = useState<string>(selectedEvent.eventName);
  const tokenAddressRef = useRef<any>();
  const { lstVanue } = useSelector((rootState: RootState) => rootState.admin);

  const eventEdit = async () => {
    const {
      eventName,
      eventDescription,
      eventDate,
      eventStartTime,
      eventEndTime,
      network,
      balanceRequired,
      EventFrequency,
      tokenName,
      tokenType,
      tokenSymbol,
      tokenDecimal,
      tokenIcon
    } = objEvent;

    let { venueName } = objEvent;
    const tokenaddress: any = tokenAddressRef.current.value;

    if (typeof venueName === 'undefined') venueName = lstVanue[0].venueName;

    const tokenData = {
      tokenName,
      tokenType,
      tokenSymbol: '',
      tokenDecimal: '',
      tokenIcon: ''
    };

    if (IS_TOKEN(tokenType)) {
      tokenData.tokenSymbol = tokenSymbol;
      tokenData.tokenDecimal = tokenDecimal as any;
      tokenData.tokenIcon = tokenIcon;
    }

    // console.log('update', tokenData);

    await updateAdminEvent(
      {
        eventName,
        venueName,
        eventDescription,
        eventDate,
        eventStartTime,
        eventEndTime,
        network,
        tokenaddress,
        EventFrequency: EventFrequency || 'Once',
        balanceRequired,
        ...tokenData
      } as unknown as IEvent,
      selectedEventName
    );
    onComplete();
  };

  const onTokenAddressChange = async (e: any) => {
    // setObjEvent({ ...objEvent, tokenaddress: e.target.value });
    try {
      const tokenDetails = await fetchTokenDetails(
        objEvent.network,
        objEvent.tokenType,
        e.target.value
      );
      if (!tokenDetails || !tokenDetails.name) {
        setObjEvent({
          ...objEvent,
          tokenName: '',
          tokenSymbol: '',
          tokenDecimal: '' as any,
          tokenIcon: ''
        });
      } else {
        const objChanges: any = {
          tokenName: tokenDetails.name
        };
        if (IS_TOKEN(objEvent.tokenType)) {
          objChanges.tokenSymbol = tokenDetails.symbol;
          objChanges.tokenDecimal = tokenDetails.decimals;
          objChanges.tokenIcon = tokenDetails.icon || '';
        }
        setObjEvent({
          ...objEvent,
          ...objChanges
        });
      }
    } catch (ex) {
      setObjEvent({
        ...objEvent,
        tokenName: '',
        tokenSymbol: '',
        tokenDecimal: '' as any,
        tokenIcon: ''
      });
    }
  };

  useEffect(() => {
    tokenAddressRef.current.value = selectedEvent.tokenaddress;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal size="lg" show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={objEvent.eventName}
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, eventName: e.target.value });
                    }}
                    placeholder="Event Name Here"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Select Venue</Form.Label>
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                  value={objEvent.venueName}
                  onChange={(e: any) => {
                    setObjEvent({ ...objEvent, venueName: e.target.value });
                  }}
                >
                  {lstVanue.map((item: any, index: number) => (
                    <option value={item.venueName} key={index}>
                      {item.venueName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Event Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={objEvent.eventDescription}
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, eventDescription: e.target.value });
                    }}
                    placeholder="Description"
                    rows={3}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={objEvent.eventDate}
                    onChange={(e: any) => {
                      console.log(e.target.value, 'Date');
                      setObjEvent({ ...objEvent, eventDate: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={objEvent.eventStartTime}
                    onChange={(e: any) => {
                      console.log(e.target.value, 'eventStartTime');
                      setObjEvent({ ...objEvent, eventStartTime: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={objEvent.eventEndTime}
                    onChange={(e: any) => {
                      console.log(e.target.value, 'eventEndTime');
                      setObjEvent({ ...objEvent, eventEndTime: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Event Frequency</Form.Label>
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={objEvent.EventFrequency}
                    onChange={(e: any) => {
                      console.log(e.target.value, 'EventFrequency');
                      setObjEvent({ ...objEvent, EventFrequency: e.target.value });
                    }}
                  >
                    <option>Once</option>
                    <option>Year</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Quarterly</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>Settings</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Network</Form.Label>
                  <Form.Select
                    className="mb-3"
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, network: parseInt(e.target.value, 10) });
                    }}
                    value={objEvent.network}
                  >
                    {/* <option>Solana</option> */}
                    {Object.entries(NETWORKS).map((item, index) => (
                      <option value={item[0]} key={index}>
                        {item[1].name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    className="mb-3"
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, tokenType: e.target.value });
                    }}
                    value={objEvent.tokenType}
                  >
                    <option value="">Select Type</option>
                    {objEvent &&
                      objEvent.network &&
                      Object.entries(OPTIONS_NETWORK_STAD).map((item, index) => {
                        if (item[1].networks.includes(objEvent.network)) {
                          return (
                            <option value={item[0]} key={index}>
                              {item[1].name}
                            </option>
                          );
                        }
                        return null;
                      })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Token Address</Form.Label>
                  <Form.Control
                    type="text"
                    // value={objEvent.tokenaddress}
                    ref={tokenAddressRef}
                    onChange={onTokenAddressChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Token Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, tokenName: e.target.value });
                    }}
                    value={objEvent.tokenName}
                    id="tokennameedit"
                    disabled={objEvent.tokenName.length > 0}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {IS_TOKEN(objEvent.tokenType) && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Token Symbol</Form.Label>
                      <Form.Control
                        type="text"
                        disabled={IS_TOKEN(objEvent.tokenType)}
                        onChange={(e: any) => {
                          setObjEvent({ ...objEvent, tokenSymbol: e.target.value });
                        }}
                        value={objEvent.tokenSymbol}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Token Decimal</Form.Label>
                      <Form.Control
                        type="number"
                        disabled={IS_TOKEN(objEvent.tokenType)}
                        value={objEvent.tokenDecimal}
                        onChange={(e: any) => {
                          setObjEvent({ ...objEvent, tokenDecimal: e.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Token Icon</Form.Label>

                      <div className="d-flex text-center">
                        <img
                          src={objEvent.tokenIcon}
                          alt={objEvent.tokenSymbol}
                          className="tokenIcon m-2"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = '/images/logo.png';
                          }}
                        />
                        <Form.Control
                          value={objEvent.tokenIcon}
                          onChange={(e: any) => {
                            setObjEvent({ ...objEvent, tokenIcon: e.target.value });
                          }}
                          type="text"
                          className="ml-2"
                        />
                      </div>
                    </Form.Group>
                  </>
                )}
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Balance Required</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={objEvent.balanceRequired}
                    onChange={(e: any) => {
                      setObjEvent({ ...objEvent, balanceRequired: e.target.value });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col style={{ textAlign: 'center' }}>
                <Button variant="primary" onClick={eventEdit}>
                  Update event
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default EditEvent;
