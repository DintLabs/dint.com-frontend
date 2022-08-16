import { fetchAdminEvents } from 'frontend/redux/slices/admin';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { IEvent } from 'frontend/types/event';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import polygonlogo from '../../material/polygon_logo.svg';
import solanalogo from '../../material/solana_logo.svg';
import EditEvent from './EditEvent';

const DisplaynetworkLogo = (props: { networkName: any }) => {
  if (props.networkName === 'Polygon') {
    return <img src={polygonlogo} alt="" height="17px" style={{ marginBottom: '2px' }} />;
  }
  if (props.networkName === 'Solana') {
    return <img src={solanalogo} alt="" height="17px" style={{ marginBottom: '2px' }} />;
  }
  return <p>token</p>;
};

const AdminEventList = () => {
  const [isEditModal, setEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();
  const { lstEvent } = useSelector((rootState: RootState) => rootState.admin);

  const onEditComplete = () => {
    setEditModal(false);
    setSelectedEvent(undefined);
    dispatch(fetchAdminEvents());
  };
  return (
    <div className="wallet_info_div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th> Venue</th>
            <th> Description</th>
            <th> Date</th>
            <th> Start Time </th>
            <th> End Time</th>
            <th> Created At</th>
            <th> Balance Required</th>
            <th> Image</th>
            <th> Edit </th>
          </tr>
        </thead>
        <tbody id="eventtable_body">
          {lstEvent.map((objEvent: IEvent, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td> {objEvent.eventName}</td>
              <td> {objEvent.venueName}</td>
              <td> {objEvent.eventDescription}</td>
              <td> {objEvent.eventDate}</td>
              <td> {objEvent.eventStartTime}</td>
              <td> {objEvent.eventEndTime}</td>
              <td> {objEvent.eventdateCreated}</td>
              <td>
                {objEvent.balanceRequired}&nbsp;{objEvent.tokenName}{' '}
                <DisplaynetworkLogo networkName={objEvent.network} />
              </td>
              <td>
                <img
                  src={objEvent.eventPhoto}
                  style={{ height: '80px', width: '80px' }}
                  alt="eventPhoto"
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedEvent(objEvent);
                    setEditModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isEditModal && (
        <EditEvent
          isOpen={isEditModal}
          selectedEvent={selectedEvent as IEvent}
          toggleModal={() => setEditModal(!isEditModal)}
          onComplete={onEditComplete}
        />
      )}
    </div>
  );
};
export default AdminEventList;
