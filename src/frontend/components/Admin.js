import '../material/admin.css';
import $ from 'jquery';
import { get, getDatabase, ref, set, child, collection } from "firebase/database";
import { db } from "./Firebase";
import { useEffect, useState } from 'react';
import { Tabs, Tab, Form, Button, Table, Modal, Card } from 'react-bootstrap';


const Admin = () => {


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
        

        if (ename !== "" || vanueDropdown !== "" || edesc !== "" || edate !== "" || starttime !== "" || endtime !== "") {

            var eventData = {
                eventName: ename,
                venueName: vanueDropdown,
                eventDescription: edesc,
                eventDate: edate,
                eventStartTime: starttime,
                eventEndTime: endtime,
                eventPhoto: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                eventdateCreated: yyyy+'-'+mm+'-'+dd
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

        if (addvenuename !== "" || addvanueaddress !== "" ) {
            var venueData = {
                venueName: addvenuename,
                venueAddress: addvanueaddress,
                venueGmap:addvanuegmap,
                venuedateCreated: yyyy+'-'+mm+'-'+dd
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
        setShow(true)
    }

    const eventEdit = () => {
        const updatedename = $("#eventNameedit").val();
        const updatedvanue = $('#vanueDropdownedit').val();
        const updatededesc = $('#eventdescriptionedit').val();
        const updatededate = $('#eventDateedit').val();
        const updatedstarttime = $('#startTimeedit').val();
        const updatedendtime = $('#endTimeedit').val();
        set(ref(db, 'events/' + SelectedeventNameFirebase), {
            eventName: updatedename,
            venueName: updatedvanue,
            eventDescription: updatededesc,
            eventDate: updatededate,
            eventStartTime: updatedstarttime,
            eventEndTime: updatedendtime,
            eventPhoto: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
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



    useEffect(() => {
        getEvents()
        getVanues()
    }, [])


    return (
        <>

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
                                                    <td><img src={data.eventPhoto} style={{height:'80px',width:'80px'}} /></td>
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

                                    <Button variant="danger" onClick={closeEventEdit}className="mb-3">Close</Button> 
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