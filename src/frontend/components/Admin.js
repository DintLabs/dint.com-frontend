import '../material/admin.css';
import { Tabs, Tab, Form, Button, Table } from 'react-bootstrap';
import $ from 'jquery';
import { get, getDatabase, ref, set, child, collection } from "firebase/database";
import { db } from "./Firebase";
import { useEffect } from 'react';


const Admin = () => {
    const EventSavedClicked = () => {
        const ename = $('#eventName').val();
        const vname = $('#vanueName').val();
        const edesc = $('#eventdescription').val();
        const edate = $('#eventDate').val();
        const starttime = $('#startTime').val();
        const endtime = $('#endTime').val();

        if (ename !== "" || vname !== "" || edesc !== "" || edate !== "" || starttime !== "" || endtime !== "") {

            var eventData = {
                eventName: ename,
                vanueName: vname,
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

        $('#Mytable_body').html("")
        const dbRef = ref(getDatabase());
        get(child(dbRef, `events/`)).then((snapshot) => {
            if (snapshot.exists()) {



                var events = Object.keys(snapshot.val())


                for (var i = 0; i < events.length; i++) {
                  
                    $('#Mytable_body').append(` <tr><td>${i}</td><td> ${snapshot.val()[events[i]].eventName}</td><td> ${snapshot.val()[events[i]].vanueName}</td><td> ${snapshot.val()[events[i]].eventDescription}</td><td> ${snapshot.val()[events[i]].eventDate}</td><td> ${snapshot.val()[events[i]].eventStartTime} </td><td> ${snapshot.val()[events[i]].eventEndTime}</td></tr>`)
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
    }, [])


    return (
        <>
            <div id="admin_form_parent">
                <div id='admin_form_child'>
                    <center> <h1>Event Create</h1> </center>


                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="home" title="Event List">
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
                                    <tbody id="Mytable_body">
        
                                           
                                        
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>

                        <Tab eventKey="profile" title="Add Events">
                            <h1>Add Event</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" id="eventName" placeholder="Event Name Here" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Venue</Form.Label>
                                <Form.Control type="text" id="vanueName" placeholder="Venue Name Here" />
                            </Form.Group>
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



                    </Tabs>













                </div>
            </div>
        </>
    )

}
export default Admin;