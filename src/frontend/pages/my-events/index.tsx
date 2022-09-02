import AddEditEventComponent from 'frontend/components/events/add-edit-event-component';
import useAuth from 'frontend/hooks/useAuth';
import { fetchVanues } from 'frontend/redux/slices/admin';
import { fetchUserEvents, fetchUserVenues } from 'frontend/redux/slices/event';
import { dispatch } from 'frontend/redux/store';
import { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../material/admin.css';
import mainlogo from '../../material/white.png';
import AddVenue from './AddVenue';
import EventList from './EventList';
import VenueList from './VenueList';

const MyEventsContainer = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const adminLogout = async () => {
    await logout();
    window.location.reload();
  };

  const adminLogoClicked = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchUserEvents(user?.id));
    dispatch(fetchUserVenues(user?.id));
  }, []);

  return (
    <>
      {/* <div id="navbarAdmin">
        <div id="navbarAdminChild">
          <div>
            <img
              id="admin_logo_img"
              src={mainlogo}
              height="40px"
              aria-hidden="true"
              onClick={adminLogoClicked}
              alt="admin_logo_g"
            />
          </div>
          <div>
            <button type="button" id="adminLogoutBtn" onClick={adminLogout}>
              Logout
            </button>
          </div>
        </div>
      </div> */}

      <div id="admin_form_parent">
        <div id="admin_form_child">
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h1>Event Management</h1>
          </div>

          <Tabs defaultActiveKey="eventshow" id="uncontrolled-tab-example" className="mb-3 dark-mode">
            <Tab eventKey="eventshow" title="Event List">
              <EventList />
            </Tab>

            <Tab eventKey="eventadd" title="Add Event" className="dark-mode">
              <AddEditEventComponent selectedEvent={null} callback={null} />
            </Tab>
            <Tab eventKey="vanueadd" title="Add Venue" className="dark-mode">
              <AddVenue />
            </Tab>
            <Tab eventKey="vanueshow" title="Venue List" className="dark-mode">
              <VenueList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default MyEventsContainer;
