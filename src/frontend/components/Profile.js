import NavbarHome from './NavbarHome'
import '../material/Profile.css'
import { Tabs, Tab, Form, Button } from 'react-bootstrap'
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword ,signInWithEmailAndPassword} from "firebase/auth";
import $ from 'jquery';
import { useState } from 'react';
const Swal = require('sweetalert2');





const Profile = () => {

    const [passErr, setPassErr] = useState('');

    const passwordUpdate = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyAEeo_gs2YjZb_2SVCowrA0y_WHSoqg71E",
            authDomain: "dint-3d4ac.firebaseapp.com",
            databaseURL: "https://dint-3d4ac-default-rtdb.firebaseio.com",
            projectId: "dint-3d4ac",
            storageBucket: "dint-3d4ac.appspot.com",
            messagingSenderId: "249686432294",
            appId: "1:249686432294:web:6a939362861134f09264e7"
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

        var current_password = $('#current_password').val();
        var new_password = $('#new_password').val();
        var confirm_new_password = $('#confirm_new_password').val();


        if(current_password !== "" && new_password !== "" && confirm_new_password !== "")
        {

            if(current_password !== new_password )
            {
                    if(new_password == confirm_new_password)
                    {
                        signInWithEmailAndPassword(auth, sessionStorage.getItem('user_email'), current_password)
                            .then((userCredential) => {
                                    const user = auth.currentUser;

                                    // update password function
                                    updatePassword(user, new_password).then(() => {
                                        setPassErr('')
                                        Swal.fire({
                                            title: 'Success',
                                            text: 'Your Password Is Updated Successfully',
                                            icon: 'success',
                                            confirmButtonText: 'Close',
                                        })

                                    }).catch((error) => {
                                        console.log(error)
                                        setPassErr(error)
                                    });
                            })
                            .catch(function (e) {
                                switch (e.code) {
                                case 'auth/user-not-found':
                                    console.log(`User is Not Found`);
                                    setPassErr('User Not Found')
                                    break;
                                case 'auth/wrong-password':
                                    console.log(`Wrong Password`);
                                    setPassErr("Wrong Current Password")
                                    break;
                                default:
                                    console.log(e.message);
                                    setPassErr('Something Went Wrong')
                                    break;
                            }
                            })
                    }
                    else{
                        setPassErr("Password and Confirm Password Not Matching")
                        console.log('password and confirm password is not matching')
                    }
                }
                else{
                    setPassErr('Cannot set current Password to New Password')
                }
        }
        else{
            setPassErr('Fill All Fields')
        }

    }

    const informationUpdate = () => {
        alert('Information Update')
    }
    const sociallinksUpdate = () => {
        alert('Social Media Update')
    }




    const passInputChange = () =>{
        setPassErr('')
    }




    return (
        <>
            <NavbarHome />



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
                                    <Form.Control type="text"  placeholder='Current Password' id="current_password" onChange={passInputChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Enter Password' id="new_password" onChange={passInputChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Confirm Password' id="confirm_new_password" onChange={passInputChange}  />
                                </Form.Group>

                                <Button variant="primary" onClick={passwordUpdate}>Save</Button>
                                <p style={{color:'red',marginTop:"20px"}}>{passErr}</p>
                                
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>

        </>
    )
}

export default Profile