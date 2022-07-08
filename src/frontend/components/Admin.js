import '../material/admin.css';
import { Tabs, Tab, Form, Button, Table } from 'react-bootstrap';
import $ from 'jquery';
import { get, getDatabase, ref, set, child, collection } from "firebase/database";
import { db } from "./Firebase";
import { useEffect } from 'react';


const Admin = () => {
    const EventSavedClicked = () => {
        const ename = $('#eventName').val();
        const vanueDropdown = $('#vanueDropdown').val();
        const edesc = $('#eventdescription').val();
        const edate = $('#eventDate').val();
        const starttime = $('#startTime').val();
        const endtime = $('#endTime').val();

        if (ename !== "" || vanueDropdown !== "" || edesc !== "" || edate !== "" || starttime !== "" || endtime !== "") {

            var eventData = {
                eventName: ename,
                vanueName: vanueDropdown,
                eventDescription: edesc,
                eventDate: edate,
                eventStartTime: starttime,
                eventEndTime: endtime,
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

        $('#eventtable_body').html("")
        const dbRef = ref(getDatabase());
        get(child(dbRef, `events/`)).then((snapshot) => {
            if (snapshot.exists()) {

                var events = Object.keys(snapshot.val())
                for (var i = 0; i < events.length; i++) {

                    $('#eventtable_body').append(` <tr><td>${i+1}</td><td> ${snapshot.val()[events[i]].eventName}</td><td> ${snapshot.val()[events[i]].vanueName}</td><td> ${snapshot.val()[events[i]].eventDescription}</td><td> ${snapshot.val()[events[i]].eventDate}</td><td> ${snapshot.val()[events[i]].eventStartTime} </td><td> ${snapshot.val()[events[i]].eventEndTime}</td></tr>`)
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }



    const createVanue = () => {
        const addvanuename = $('#addvanueName').val()
        const addvanueaddress = $('#addvanueAddress').val()

        if (addvanuename !== "" || addvanueaddress !== "") {
            var venueData = {
                venueName: addvanuename,
                venueAddress: addvanueaddress,
            }
            set(ref(db, `venues/${addvanuename}`), venueData).then(() => {
                alert("Vanue Saved Success");
                getVanues();
                $('#addvanueName').val("")
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

        const dbRef = ref(getDatabase());
        get(child(dbRef, `venues/`)).then((snapshot) => {
            if (snapshot.exists()) {

                var vanues = Object.keys(snapshot.val())

                for (var j = 0; j < vanues.length; j++) {
                    $('#vanuetable_body').append(`<tr> <td>${j+1}</td><td>${snapshot.val()[vanues[j]].venueName}</td><td>${snapshot.val()[vanues[j]].venueAddress}</td> </tr>`)

                    $('#vanueDropdown').append(` <option value="${snapshot.val()[vanues[j]].venueName}">${snapshot.val()[vanues[j]].venueName}</option>`)
                }

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
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
                                        </tr>
                                    </thead>
                                    <tbody id="eventtable_body"></tbody>
                                </Table>
                            </div>
                        </Tab>

                        <Tab eventKey="eventadd" title="Add Events">
                            <h1>Add Event</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" id="eventName" placeholder="Event Name Here" />
                            </Form.Group>

                            <Form.Label>Select Vanue</Form.Label>
                            <Form.Select className="mb-3"  aria-label="Default select example" id="vanueDropdown" >

                            </Form.Select>
                            {/* <Form.Group className="mb-3" >
                                <Form.Label>Venue</Form.Label>
                                <Form.Control type="text" id="vanueName" placeholder="Venue Name Here" />
                            </Form.Group> */}
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

                            <Button variant="primary" onClick={EventSavedClicked}>
                                Submit
                            </Button>
                        </Tab>




                        <Tab eventKey="vanueadd" title="Add vanue">

                            <h1>Add vanue</h1>

                            <Form.Group className="mb-3" >
                                <Form.Label>Vanue Name</Form.Label>
                                <Form.Control type="text" id="addvanueName" placeholder="Vanue Name Here" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" id="addvanueAddress" placeholder="Address Here" />
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