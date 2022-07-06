import NavbarHome from './NavbarHome'
import '../material/Profile.css'
import { Tabs, Tab, Form, Button } from 'react-bootstrap'
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import $ from 'jquery';
import { useState } from 'react';
import { getDatabase, set,onValue ,get,child} from "firebase/database";
import { ref} from "firebase/database";
import { useEffect } from 'react';
const Swal = require('sweetalert2');





const Profile = () => {

    const [passErr, setPassErr] = useState('');

    useEffect(()=>{
        getdatavalues()
    },[])
   
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
    const auth = getAuth(app);
    const db = getDatabase(app);
    const userId = auth.currentUser.uid;
   


    // function for updating password
    const passwordUpdate = () => {
        var current_password = $('#current_password').val();
        var new_password = $('#new_password').val();
        var confirm_new_password = $('#confirm_new_password').val();

        if (current_password !== "" && new_password !== "" && confirm_new_password !== "") {
            if (current_password !== new_password) {
                if (new_password == confirm_new_password) {
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
                else {
                    setPassErr("Password and Confirm Password Not Matching")
                    console.log('password and confirm password is not matching')
                }
            }
            else {
                setPassErr('Cannot set current Password to New Password')
            }
        }
        else {
            setPassErr('Fill All Fields')
        }

    }

    // function of updating user's profile information 
    const informationUpdate = () => {
        try {
             var uname = $('#profileName').val()
            var ubio = $('#biography').val()
            var ucity = $('#city').val()
            var utwitter = $('#twitterLink').val()
          var uinsta = $('#instaLink').val()
             var discord = $('#discordLink').val()
   
            set(ref(db, 'users/' + userId), {
                name: uname,
                biography: ubio,
                type:'simple',
                city: ucity,
                discord: discord,
                instagram: uinsta,
                profileImage: "https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png",
                twitter: utwitter
            }).then(() => {
                alert('update success')
            })
                .catch((error) => {
                    alert('error in update' + error)
                });

          
        }
        catch (e) {
            alert(e)
        }

    }

    const passInputChange = () => { setPassErr('') }



    // get values from database
    const getdatavalues =()=>{


        get(child(ref(db), `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                $('#profileName').val(snapshot.val().name)
                $('#biography').val(snapshot.val().biography)
                $('#city').val(snapshot.val().city)
                $('#twitterLink').val(snapshot.val().twitter)
                $('#instaLink').val(snapshot.val().instagram)
                $('#discordLink').val(snapshot.val().discord)
                $('#profile_image_edit').attr('src',snapshot.val().profileImage)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });


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
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder='Name'  id="profileName" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Biography</Form.Label>
                                        <Form.Control as="textarea" id="biography" placeholder='Biography' rows={3} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control  type="text" id="city" placeholder='city' />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                    <Form.Label>Twitter</Form.Label>
                                    <Form.Control type="text"  placeholder='URL' id="twitterLink" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Instagram</Form.Label>
                                    <Form.Control type="text" id="instaLink" placeholder='URL' />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Discord</Form.Label>
                                    <Form.Control type="text" id="discordLink" placeholder='URL' />
                                </Form.Group>
                                    <Button variant="primary" onClick={informationUpdate}>Save</Button>
                                </Form>
                            </div>
                            <div className="profile_div_child profile_img_div">
                                <div id="edit_image_print">
                                   <img  id='profile_image_edit'></img>
                                </div>

                            </div>
                        </div>
                    </Tab>

            
                    <Tab eventKey="account" title="Account" >
                        <div className="forgot_password_div">
                            <h5>Change Your Password</h5>
                            <Form style={{ marginTop: '25px' }}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Current password</Form.Label>
                                    <Form.Control type="text" placeholder='Current Password' id="current_password" onChange={passInputChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Enter Password' id="new_password" onChange={passInputChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="text" placeholder='Confirm Password' id="confirm_new_password" onChange={passInputChange} />
                                </Form.Group>

                                <Button variant="primary" onClick={passwordUpdate}>Save</Button>
                                <p style={{ color: 'red', marginTop: "20px" }}>{passErr}</p>

                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </div>

        </>
    )
}

export default Profile