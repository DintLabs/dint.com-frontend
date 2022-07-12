import '../material/admin.css';
import $ from 'jquery';
import { get, getDatabase, ref, set, update, child} from "firebase/database";
import { db } from "./Firebase";
import { useEffect, useState } from 'react';
import { Tabs, Tab, Form, Button, Table } from 'react-bootstrap';
import mainlogo from '../material/white.png';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    let navigate = useNavigate();
    const [eventslist, setEventsData] = useState([])
    const [SelectedeventNameFirebase, setSelectedEventNameFirebase] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


    const createEvent = () => {
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
        const eventid = Math.floor((Math.random() * 100000) + 999999)

        if (ename !== "" || vanueDropdown !== "" || edesc !== "" || edate !== "" || starttime !== "" || endtime !== "") {

            var eventData = {
                eventId: eventid,
                eventName: ename,
                venueName: vanueDropdown,
                eventDescription: edesc,
                eventDate: edate,
                eventStartTime: starttime,
                eventEndTime: endtime,
                eventPhoto: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                eventdateCreated: yyyy + '-' + mm + '-' + dd,
                network: network,
                tokenaddress: address,
                balanceRequired: balanceRequired,
                EventFrequency: EventFrequency
            }


            set(ref(db, `events/${ename}`), eventData).then(() => {
                alert("Event Saved Success")
                getEvents()
            }).catch((e) => {
                alert('Error in event Save')
            })

        }
        else (
            alert('please fill all fields')
        )
    }

    const getEvents = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `events/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var events = Object.keys(snapshot.val())
                var dataarray = []
                for (var i = 0; i < events.length; i++) {
                    dataarray.push(snapshot.val()[events[i]])
                }
                setEventsData(dataarray)

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    const createVanue = () => {
        const addvenuename = $('#addvenuename').val()
        const addvanueaddress = $('#addvanueAddress').val()
        const addvanuegmap = $('#addvanueGmap').val()

        if (addvenuename !== "" || addvanueaddress !== "") {
            var venueData = {
                venueName: addvenuename,
                venueAddress: addvanueaddress,
                venueGmap: addvanuegmap,
                venuedateCreated: yyyy + '-' + mm + '-' + dd
            }
            set(ref(db, `venues/${addvenuename}`), venueData).then(() => {
                alert("Vanue Saved Success");
                getVanues();
                $('#addvenuename').val("")
                $('#addvanueAddress').val("")

            }).catch((e) => {
                alert('Error in Vanue Save', e)
            })
        }
        else {
            alert('please fill all fields in vanue form')
        }
    }

    const getVanues = () => {
        $('#vanuetable_body').html("")
        $('#vanueDropdown').html("")
        $('#vanueDropdownedit').html("")

        const dbRef = ref(getDatabase());
        get(child(dbRef, `venues/`)).then((snapshot) => {
            if (snapshot.exists()) {

                var vanues = Object.keys(snapshot.val())

                for (var j = 0; j < vanues.length; j++) {
                    $('#vanuetable_body').append(`<tr> <td>${j + 1}</td><td>${snapshot.val()[vanues[j]].venueName}</td><td>${snapshot.val()[vanues[j]].venueAddress}</td> <td>${snapshot.val()[vanues[j]].venueGmap}</td> </tr>`)

                    $('#vanueDropdown').append(` <option value="${snapshot.val()[vanues[j]].venueName}">${snapshot.val()[vanues[j]].venueName}</option>`)

                    $('#vanueDropdownedit').append(` <option value="${snapshot.val()[vanues[j]].venueName}">${snapshot.val()[vanues[j]].venueName}</option>`)


                }

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }

    const editEventShow = (data) => {
        $("#event_edit_div").css('display', 'block')
        $("#eventNameedit").val(data.eventName);
        setSelectedEventNameFirebase(data.eventName)
        $('#vanueDropdownedit').val(data.venueName);
        $('#eventdescriptionedit').val(data.eventDescription);
        $('#eventDateedit').val(data.eventDate);
        $('#startTimeedit').val(data.eventStartTime);
        $('#endTimeedit').val(data.eventEndTime);
        $('#networkedit').val(data.network);
        $('#addressedit').val(data.tokenaddress);
        $('#EventFrequencyedit').val(data.EventFrequency);
        $('#balanceRequirededit').val(data.balanceRequired);

        setShow(true)
    }

    const eventEdit = () => {
        const updatedename = $("#eventNameedit").val();
        const updatedvanue = $('#vanueDropdownedit').val();
        const updatededesc = $('#eventdescriptionedit').val();
        const updatededate = $('#eventDateedit').val();
        const updatedstarttime = $('#startTimeedit').val();
        const updatedendtime = $('#endTimeedit').val();
        const updatenetwork = $('#networkdit').val();
        const updateaddress = $('#addressedit').val();
        const updatebalancerequired = $('#balanceRequirededit').val();
        const updateEventFrequency = $('#EventFrequencyedit').val();


        update(ref(db, 'events/' + SelectedeventNameFirebase), {
            eventName: updatedename,
            venueName: updatedvanue,
            eventDescription: updatededesc,
            eventDate: updatededate,
            eventStartTime: updatedstarttime,
            eventEndTime: updatedendtime,
            network: updatenetwork,
            tokenaddress: updateaddress,
            balanceRequired: updatebalancerequired,
            EventFrequency: updateEventFrequency

        }).then(() => {
            alert('update success')
            getEvents()
            closeEventEdit()
        })
            .catch((error) => {
                alert('error in update' + error)
            });
    }

    const closeEventEdit = () => {
        $("#event_edit_div").css('display', 'none')
    }




    const adminLogout = () => {
        navigate('/')
        window.location.reload()
    }


    const adminLogoClicked = () => {
        navigate('/')
    }

    useEffect(() => {
        getEvents()
        getVanues()
    }, [])


    return (
        <>
            <div id="navbarAdmin">
                <div id="navbarAdminChild">
                    <div><img id="admin_logo_img" src={mainlogo} height={"40px"} onClick={adminLogoClicked}></img></div>
                    <div><button id='adminLogoutBtn' onClick={adminLogout}>Logout</button></div>
                </div>
            </div>

            <div id="admin_form_parent">
                <div id='admin_form_child'>
                    <center> <h1>Event Management</h1> </center>

                    <Tabs defaultActiveKey="eventshow" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="eventshow" title="Event List">
                            <div className="wallet_info_div">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th> Name</th>
                                            <th> Vanue</th>
                                            <th> Description</th>
                                            <th> Date</th>
                                            <th> Start Time </th>
                                            <th> End Time</th>
                                            <th> Created At</th>
                                            <th> Image</th>
                                            <th> Edit </th>
                                        </tr>
                                    </thead>
                                    <tbody id="eventtable_body">
                                        {eventslist.map((data, index) => (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td> {data.eventName}</td>
                                                    <td> {data.venueName}</td>
                                                    <td> {data.eventDescription}</td>
                                                    <td> {data.eventDate}</td>
                                                    <td> {data.eventStartTime}</td>
                                                    <td> {data.eventEndTime}</td>
                                                    <td> {data.eventdateCreated}</td>
                                                    <td><img src={data.eventPhoto} style={{ height: '80px', width: '80px' }} /></td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => editEventShow(data)}>Edit</Button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </Table>

                                {/* Edit Event Page */}
                                <div style={{ display: 'none', marginTop: '50px' }} id="event_edit_div">

                                    <Button variant="danger" onClick={closeEventEdit} className="mb-3">Close</Button>
                                    <div >
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Event Name</Form.Label>
                                            <Form.Control type="text" id="eventNameedit" placeholder="Event Name Here" />
                                        </Form.Group>

                                        <Form.Label>Select Vanue</Form.Label>
                                        <Form.Select className="mb-3" aria-label="Default select example" id="vanueDropdownedit" >
                                        </Form.Select>

                                        <Form.Group className="mb-3" >
                                            <Form.Label>Event Description</Form.Label>
                                            <Form.Control as="textarea" id="eventdescriptionedit" placeholder="Description" rows={3} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Event Date</Form.Label>
                                            <Form.Control id="eventDateedit" type="date" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control type="time" id="startTimeedit" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>End Time</Form.Label>
                                            <Form.Control type="time" id="endTimeedit" />
                                        </Form.Group>

                                        <h4>Settings</h4>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Network</Form.Label>
                                            <Form.Select className="mb-3" aria-label="Default select example" id="networkdit" >
                                                <option>Solana</option>
                                                <option>Ethereum</option>
                                                <option>Polygon</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" id="addressedit" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Balance Required</Form.Label>
                                            <Form.Control type="text" id="balanceRequirededit" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Event Frequency</Form.Label>
                                            <Form.Select className="mb-3" aria-label="Default select example" id="EventFrequencyedit" >
                                                <option>Once</option>
                                                <option>Year</option>
                                                <option>Monthly</option>
                                                <option>Weekly</option>
                                                <option>Quarterly</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Button variant="primary" onClick={eventEdit}>
                                            Update event
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </Tab>

                        <Tab eventKey="eventadd" title="Add Events">
                            <h1>Add Event</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" id="eventName" placeholder="Event Name Here" />
                            </Form.Group>

                            <Form.Label>Select Vanue</Form.Label>
                            <Form.Select className="mb-3" aria-label="Default select example" id="vanueDropdown" >

                            </Form.Select>

                            <Form.Group className="mb-3" >
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control as="textarea" id="eventdescription" placeholder="Description" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Event Date</Form.Label>
                                <Form.Control id="eventDate" type="date" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" id="startTime" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" id="endTime" />
                            </Form.Group>


                            <h4>Settings</h4>

                            {/* settings */}
                            <Form.Group className="mb-3" >
                                <Form.Label>Network</Form.Label>
                                <Form.Select className="mb-3" aria-label="Default select example" id="network" >
                                    <option>Solana</option>
                                    <option>Ethereum</option>
                                    <option>Polygon</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" id="address" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Balance Required</Form.Label>
                                <Form.Control type="text" id="balanceRequired" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Event Frequency</Form.Label>
                                <Form.Select className="mb-3" aria-label="Default select example" id="EventFrequency" >
                                    <option>Once</option>
                                    <option>Year</option>
                                    <option>Monthly</option>
                                    <option>Weekly</option>
                                    <option>Quarterly</option>
                                </Form.Select>
                            </Form.Group>


                            <Button variant="primary" onClick={createEvent}>
                                Submit
                            </Button>
                        </Tab>

                        <Tab eventKey="vanueadd" title="Add vanue">

                            <h1>Add vanue</h1>

                            <Form.Group className="mb-3" >
                                <Form.Label>Vanue Name</Form.Label>
                                <Form.Control type="text" id="addvenuename" placeholder="Vanue Name Here" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" id="addvanueAddress" placeholder="Address Here" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Address Link (Optional)</Form.Label>
                                <Form.Control type="text" id="addvanueGmap" placeholder="Add Google map Link Here" />
                            </Form.Group>
                            <Button variant="primary" onClick={createVanue}>
                                Submit
                            </Button>
                        </Tab>
                        <Tab eventKey="vanueshow" title="Vanue List">
                            <h1>Show vanue</h1>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th> Vanue Name</th>
                                        <th> Vanue Address</th>
                                        <th> Google Map</th>
                                    </tr>
                                </thead>
                                <tbody id="vanuetable_body">
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )

}
export default Admin;