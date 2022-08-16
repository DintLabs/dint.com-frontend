import useAuth from 'frontend/hooks/useAuth';
import { AuthUser } from 'frontend/types/authentication';
import { useState } from 'react';
import { Button, Form, Tab, Tabs } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../material/Profile.css';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [passErr, setPassErr] = useState('');
  const [objUser, setObjUser] = useState<AuthUser>({});

  const [updatePasswordState, setObjUpdatePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const onChangeUserInfo = (updatedInfo: Partial<AuthUser>) => {
    setObjUser({ ...objUser, ...updatedInfo });
  };

  const onPasswordStateChange = (updatedInfo: any) => {
    setObjUpdatePassword({ ...updatePasswordState, ...updatedInfo });
  };

  // function for updating password
  const passwordUpdate = async () => {
    if (
      updatePasswordState.currentPassword === '' ||
      updatePasswordState.newPassword === '' ||
      updatePasswordState.confirmNewPassword === ''
    ) {
      return setPassErr('Fill All Fields');
    }
    if (updatePasswordState.currentPassword === updatePasswordState.newPassword) {
      return setPassErr('Cannot set current Password to New Password');
    }
    if (updatePasswordState.newPassword !== updatePasswordState.confirmNewPassword) {
      console.log('password and confirm password is not matching');
      return setPassErr('Password and Confirm Password Not Matching');
    }

    try {
      await changePassword(
        updatePasswordState.currentPassword,
        updatePasswordState.confirmNewPassword
      );
      Swal.fire({
        title: 'Success',
        text: 'Your Password Is Updated Successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      });
      setPassErr('');
    } catch (ex: any) {
      if (ex.code === 'auth/user-not-found') {
        setPassErr('User Not Found');
      } else if (ex.code === 'auth/wrong-password') {
        setPassErr('Wrong Current Password');
      } else if (ex.code) {
        setPassErr('Something Went Wrong');
      } else {
        setPassErr(ex);
      }
      console.log(ex);
    }
    return null;
  };

  // function of updating user's profile information
  const informationUpdate = async () => {
    try {
      await updateProfile({ ...objUser });
    } catch (e) {
      alert(e);
    }
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
                      value={objUser?.name || user?.name || ''}
                      onChange={(e: any) => {
                        onChangeUserInfo({ name: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={objUser?.biography || user?.biography || ''}
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
                      value={objUser?.city || user?.city || ''}
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
                      value={objUser?.twitter || user?.twitter || ''}
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
                      value={objUser?.instagram || user?.instagram || ''}
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
                      value={objUser?.discord || user?.discord || ''}
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
                    type="password"
                    placeholder="Current Password"
                    value={updatePasswordState.currentPassword}
                    onChange={(e: any) => {
                      onPasswordStateChange({ currentPassword: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={updatePasswordState.newPassword}
                    onChange={(e: any) => {
                      onPasswordStateChange({ newPassword: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={updatePasswordState.confirmNewPassword}
                    onChange={(e: any) => {
                      onPasswordStateChange({ confirmNewPassword: e.target.value });
                    }}
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
