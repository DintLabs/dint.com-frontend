import NavbarEvents from './NavbarEvents'
import '../material/Profile.css'
import { Tabs, Tab, Form, Button } from 'react-bootstrap'
// import { getAuth, reauthenticateWithCredential } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";



const Profile = () => {


    const firebaseConfig = {
        apiKey: "AIzaSyAEeo_gs2YjZb_2SVCowrA0y_WHSoqg71E",
        authDomain: "dint-3d4ac.firebaseapp.com",
        databaseURL: "https://dint-3d4ac-default-rtdb.firebaseio.com",
        projectId: "dint-3d4ac",
        storageBucket: "dint-3d4ac.appspot.com",
        messagingSenderId: "249686432294",
        appId: "1:249686432294:web:6a939362861134f09264e7"
      };
    
        
    

    const passwordUpdate = () => {
        
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyAEeo_gs2YjZb_2SVCowrA0y_WHSoqg71E",
            authDomain: "dint-3d4ac.firebaseapp.com",
            databaseURL: "https://dint-3d4ac-default-rtdb.firebaseio.com",
            projectId: "dint-3d4ac",
            storageBucket: "dint-3d4ac.appspot.com",
            messagingSenderId: "249686432294",
            appId: "1:249686432294:web:6a939362861134f09264e7"
        };
    
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const auth = getAuth(app);
        const user = auth.currentUser;

        if(user !== null){
            user.providerData.forEach((profile) =>{
                console.log(profile.email)
            });
        }
        else{
            alert('pass null')
        }



     
    }

    const informationUpdate = () => {
        alert('Information Update')
    }
    const sociallinksUpdate = () => {
        alert('Social Media Update')
    }

    return (
        <>
            <NavbarEvents />

           

            <div className="profile_form_parent">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="home" title="Wallets">
                        <div className="wallet_info_div">
                            <h5>Wallets are Coming Soon</h5>
                        </div>
                    </Tab>



                    <Tab eventKey="profile" title="Personal">
                        <div className="profile_form_div">
                            <div className="profile_div_child">
                                <h5>Edit Personal Information</h5>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder='Name' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Biography</Form.Label>
                                        <Form.Control as="textarea" placeholder='Biography' rows={3} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder='city' />
                                    </Form.Group>
                                    <Button variant="primary" onClick={informationUpdate}>Save</Button>
                                </Form>
                            </div>
                            <div className="profile_div_child profile_img_div">
                                <div id="edit_image_print">
                                    image
                                </div>

                            </div>
                        </div>
                    </Tab>




                    <Tab eventKey="socialMedia" title="Social Media" >
                        <div className="social_media_div">
                            <h5>Add Social Media Links</h5>
                            <Form style={{ marginTop: '25px' }}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Twitter</Form.Label>
                                    <Form.Control type="text" placeholder='URL' />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Instagram</Form.Label>
                                    <Form.Control type="text" placeholder='URL' />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Discord</Form.Label>
                                    <Form.Control type="text" placeholder='URL' />
                                </Form.Group>
                                <Button variant="primary" onClick={sociallinksUpdate}>Save</Button>
                            </Form>
                        </div>
                    </Tab>




                    <Tab eventKey="account" title="Account" >
                        <div className="forgot_password_div">
                            <h5>Change Your Password</h5>
                            <Form style={{ marginTop: '25px' }}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Current password</Form.Label>
                                    <Form.Control type="text" placeholder='Current Password' />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Enter Password' />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Confirm Password' />
                                </Form.Group>
                                <Button variant="primary" onClick={passwordUpdate}>Save</Button>
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>

        </>
    )
}

export default Profile