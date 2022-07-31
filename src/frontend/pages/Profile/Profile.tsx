import { signInWithEmailAndPassword, updatePassword, User } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { authInstance, databaseInstance } from 'frontend/contexts/FirebaseInstance';
import useAuth from 'frontend/hooks/useAuth';
import { AuthUser } from 'frontend/types/authentication';
import $ from 'jquery';
import { useState } from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../material/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  console.log(user);
  const [passErr, setPassErr] = useState('');
  const [objUser, setObjUser] = useState<AuthUser>({});

  const onChangeUserInfo = (updatedInfo: Partial<AuthUser>) => {
    setObjUser({ ...objUser, ...updatedInfo });
  };

  // function for updating password
  const passwordUpdate = () => {
    const current_password = $('#current_password').val() as string;
    const new_password = $('#new_password').val() as string;
    const confirm_new_password = $('#confirm_new_password').val();

    if (current_password !== '' && new_password !== '' && confirm_new_password !== '') {
      if (current_password !== new_password) {
        if (new_password === confirm_new_password) {
          signInWithEmailAndPassword(
            authInstance,
            authInstance.currentUser?.uid || '',
            current_password
          )
            .then((userCredential) => {
              const user = authInstance.currentUser;
              // update password function
              updatePassword(user as User, new_password)
                .then(() => {
                  setPassErr('');
                  Swal.fire({
                    title: 'Success',
                    text: 'Your Password Is Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Close'
                  });
                })
                .catch((error) => {
                  console.log(error);
                  setPassErr(error);
                });
            })
            .catch((e) => {
              switch (e.code) {
                case 'auth/user-not-found':
                  console.log(`User is Not Found`);
                  setPassErr('User Not Found');
                  break;
                case 'auth/wrong-password':
                  console.log(`Wrong Password`);
                  setPassErr('Wrong Current Password');
                  break;
                default:
                  console.log(e.message);
                  setPassErr('Something Went Wrong');
                  break;
              }
            });
        } else {
          setPassErr('Password and Confirm Password Not Matching');
          console.log('password and confirm password is not matching');
        }
      } else {
        setPassErr('Cannot set current Password to New Password');
      }
    } else {
      setPassErr('Fill All Fields');
    }
  };

  // function of updating user's profile information
  const informationUpdate = () => {
    try {
      const uname = $('#profileName').val();
      const ubio = $('#biography').val();
      const ucity = $('#city').val();
      const utwitter = $('#twitterLink').val();
      const uinsta = $('#instaLink').val();
      const discord = $('#discordLink').val();

      update(ref(databaseInstance, `users/${authInstance?.currentUser?.uid || ''}`), {
        name: uname,
        biography: ubio,
        city: ucity,
        discord,
        instagram: uinsta,
        profileImage:
          'https://w1.pngwing.com/pngs/386/684/png-transparent-face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette.png',
        twitter: utwitter
      })
        .then(() => {
          alert('update success');
        })
        .catch((error) => {
          alert(`error in update${error}`);
        });
    } catch (e) {
      alert(e);
    }
  };

  const passInputChange = () => {
    setPassErr('');
  };

  return (
    <>
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
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={objUser?.name || user?.name}
                      onChange={(e: any) => {
                        onChangeUserInfo({ name: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={objUser?.biography}
                      onChange={(e: any) => {
                        onChangeUserInfo({ biography: e.target.value });
                      }}
                      placeholder="Biography"
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.city}
                      onChange={(e: any) => {
                        onChangeUserInfo({ city: e.target.value });
                      }}
                      placeholder="city"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Twitter</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.twitter}
                      onChange={(e: any) => {
                        onChangeUserInfo({ twitter: e.target.value });
                      }}
                      placeholder="URL"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.instagram}
                      onChange={(e: any) => {
                        onChangeUserInfo({ instagram: e.target.value });
                      }}
                      id="instaLink"
                      placeholder="URL"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Discord</Form.Label>
                    <Form.Control
                      type="text"
                      value={objUser?.discord}
                      onChange={(e: any) => {
                        onChangeUserInfo({ discord: e.target.value });
                      }}
                      id="discordLink"
                      placeholder="URL"
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={informationUpdate}>
                    Save
                  </Button>
                </Form>
              </div>
              <div className="profile_div_child profile_img_div">
                <div id="edit_image_print">
                  <img id="profile_image_edit" alt="profile_image_edit" src={user?.profileImage} />
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="account" title="Account">
            <div className="forgot_password_div">
              <h5>Change Your Password</h5>
              <Form style={{ marginTop: '25px' }}>
                <Form.Group className="mb-3">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Current Password"
                    id="current_password"
                    onChange={passInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Password"
                    id="new_password"
                    onChange={passInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Confirm Password"
                    id="confirm_new_password"
                    onChange={passInputChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={passwordUpdate}>
                  Save
                </Button>
                <p style={{ color: 'red', marginTop: '20px' }}>{passErr}</p>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
