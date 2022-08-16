import useAuth from 'frontend/hooks/useAuth';
import { fetchAdminEvents, fetchVanues } from 'frontend/redux/slices/admin';
import { dispatch } from 'frontend/redux/store';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../material/admin.css';
import mainlogo from '../../material/white.png';
import AddVenue from './AddVenue';
import AdminEventList from './AdminEventList';
import CreateEvent from './CreateEvent';
import VenueList from './VenueList';

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const adminLogout = async () => {
    await logout();
    window.location.reload();
  };

  const adminLogoClicked = () => {
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchAdminEvents());
    dispatch(fetchVanues());
  }, []);

  return (
    <>
      <div id="navbarAdmin">
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
      </div>

      <div id="admin_form_parent">
        <div id="admin_form_child">
          <div style={{ textAlign: 'center' }}>
            <h1>Event Management</h1>
          </div>

          <Tabs defaultActiveKey="eventshow" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="eventshow" title="Event List">
              <AdminEventList />
            </Tab>

            <Tab eventKey="eventadd" title="Add Event">
              <CreateEvent />
            </Tab>
            <Tab eventKey="vanueadd" title="Add Venue">
              <AddVenue />
            </Tab>
            <Tab eventKey="vanueshow" title="Venue List">
              <VenueList />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default Admin;
