import { child, get, getDatabase, ref, set } from 'firebase/database';
import { authInstance, databaseInstance } from 'frontend/contexts/FirebaseInstance';
import { fetchAdminEvents, fetchVanues, setAdminSliceChanges } from 'frontend/redux/slices/admin';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import $ from 'jquery';
import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../material/admin.css';
import mainlogo from '../../material/white.png';
import { IS_TOKEN } from '../../utils';
import { fetchTokenDetails } from '../../web3/service';
import AdminEventList from './AdminEventList';

const Admin = () => {
  const navigate = useNavigate();
  const { addEventForm, editEventForm, selectedEventNameForFirebase, tokenName } = useSelector(
    (rootState: RootState) => rootState.admin
  );

  // const [show, setShow] = useState(false);

  // React.useEffect(() => { -- nik
  //   if ($('#addressedit').val().length > 0) getpolygontokennameforEdit();
  // }, [editEventForm && editEventForm.network, editEventForm && editEventForm.token_type]);

  const onChange = (e: { target: { id: string; value: string } }) => {
    if (e.target.id === 'network') {
      dispatch(
        setAdminSliceChanges({
          addEventForm: {
            ...addEventForm,
            network: parseInt(e.target.value, 10)
          }
        })
      );
    } else if (e.target.id === 'token_type') {
      dispatch(
        setAdminSliceChanges({
          addEventForm: {
            ...addEventForm,
            token_type: e.target.value
          }
        })
      );
    } else if (e.target.id === 'tokenIcon') {
      dispatch(
        setAdminSliceChanges({
          addEventForm: {
            ...addEventForm,
            tokenIcon: e.target.value
          }
        })
      );
    }
  };

  // React.useEffect(() => { --nik
  //   if ($('#address').val().length > 0) getpolygontokenname();
  // }, [addEventForm && addEventForm.network, addEventForm && addEventForm.token_type]);

  // const handleClose = () => setShow(false);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  const getpolygontokenname = () => {
    fetchTokenDetails(addEventForm.network, addEventForm.token_type, $('#address').val())
      .then((token_details) => {
        console.log('getpolygontokenname', token_details);
        if (!token_details || !token_details.name) {
          dispatch(
            setAdminSliceChanges({
              tokenName: '',
              addEventForm: {
                ...addEventForm,
                tokenSymbol: '',
                tokenDecimal: null,
                tokenIcon: ''
              }
            })
          );
        } else {
          const objChanges: any = {
            tokenName: token_details.name
          };
          if (IS_TOKEN(addEventForm.token_type)) {
            objChanges.addEventForm = {
              ...addEventForm,
              tokenSymbol: token_details.symbol,
              tokenDecimal: token_details.decimals,
              tokenIcon: token_details.icon || ''
            };
          }
          dispatch(setAdminSliceChanges({ ...objChanges }));
        }
      })
      .catch((error) => {
        dispatch(
          setAdminSliceChanges({
            tokenName: '',
            addEventForm: {
              ...addEventForm,
              tokenSymbol: '',
              tokenDecimal: '',
              tokenIcon: ''
            }
          })
        );
      });
  };

  const createEvent = () => {
    console.log('balanceRequired');
    const ename = $('#eventName').val();
    const vanueDropdown = $('#vanueDropdown').val();
    const edesc = $('#eventdescription').val();
    const edate = $('#eventDate').val();
    const starttime = $('#startTime').val();
    const endtime = $('#endTime').val();
    const network = $('#network').val();
    const address = $('#address').val();
    const balanceRequired = $('#balanceRequired').val();
    const EventFrequency = $('#EventFrequency').val();
    const eventid = Math.floor(Math.random() * 100000 + 999999);
    const tokenName = $('#tokenname').val();
    const tokenType = $('#token_type').val() as string;

    const tokenData = {
      tokenName,
      tokenType,
      tokenSymbol: '',
      tokenDecimal: '',
      tokenIcon: ''
    };

    if (IS_TOKEN(tokenType)) {
      tokenData.tokenSymbol = addEventForm.tokenSymbol || '';
      tokenData.tokenDecimal = addEventForm.tokenDecimal || '';
      tokenData.tokenIcon = addEventForm.tokenIcon;
    }
    // const
    if (
      ename !== '' ||
      vanueDropdown !== '' ||
      edesc !== '' ||
      edate !== '' ||
      starttime !== '' ||
      endtime !== ''
    ) {
      const eventData = {
        eventId: eventid,
        eventName: ename,
        venueName: vanueDropdown,
        eventDescription: edesc,
        eventDate: edate,
        eventStartTime: starttime,
        eventEndTime: endtime,
        eventPhoto:
          'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        eventdateCreated: `${yyyy}-${mm}-${dd}`,
        network,
        tokenaddress: address,
        balanceRequired: balanceRequired || 1,
        EventFrequency,
        ...tokenData
      };

      set(ref(databaseInstance, `events/${ename}`), eventData)
        .then(() => {
          alert('Event Saved Success');
          // getEvents();
        })
        .catch((e) => {
          console.error(e);
          alert('Error in event Save');
        });
    } else alert('please fill all fields');
  };

  const createVanue = () => {
    const addvenuename = $('#addvenuename').val();
    const addvanueaddress = $('#addvanueAddress').val();
    const addvanuegmap = $('#addvanueGmap').val();

    if (addvenuename !== '' || addvanueaddress !== '') {
      const venueData = {
        venueName: addvenuename,
        venueAddress: addvanueaddress,
        venueGmap: addvanuegmap,
        venuedateCreated: `${yyyy}-${mm}-${dd}`
      };
      set(ref(databaseInstance, `venues/${addvenuename}`), venueData)
        .then(() => {
          alert('Vanue Saved Success');
          getVanues();
          $('#addvenuename').val('');
          $('#addvanueAddress').val('');
        })
        .catch((e) => {
          alert('Error in Vanue Save');
        });
    } else {
      alert('please fill all fields in vanue form');
    }
  };

  const getVanues = () => {
    $('#vanuetable_body').html('');
    $('#vanueDropdown').html('');
    $('#vanueDropdownedit').html('');

    const dbRef = ref(getDatabase());
    get(child(dbRef, `venues/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const vanues = Object.keys(snapshot.val());

          for (let j = 0; j < vanues.length; j++) {
            $('#vanuetable_body').append(
              `<tr> <td>${j + 1}</td><td>${snapshot.val()[vanues[j]].venueName}</td><td>${
                snapshot.val()[vanues[j]].venueAddress
              }</td> <td>${snapshot.val()[vanues[j]].venueGmap}</td> </tr>`
            );

            $('#vanueDropdown').append(
              ` <option value="${snapshot.val()[vanues[j]].venueName}">${
                snapshot.val()[vanues[j]].venueName
              }</option>`
            );

            $('#vanueDropdownedit').append(
              ` <option value="${snapshot.val()[vanues[j]].venueName}">${
                snapshot.val()[vanues[j]].venueName
              }</option>`
            );
          }
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeEventEdit = () => {
    $('#event_edit_div').css('display', 'none');
  };

  const adminLogout = () => {
    authInstance
      .signOut()
      .then(() => {
        alert('logout success');
        window.location.reload();
      })
      .catch((e: any) => {
        console.log(e);
      });
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
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default Admin;
