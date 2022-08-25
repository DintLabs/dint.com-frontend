// @ts-nocheck
/* eslint-disable */
import * as React from 'react';
import _axios from 'frontend/api/axios';
import useAuth from 'frontend/hooks/useAuth';
import { AuthUser } from 'frontend/types/authentication';
import { Button, Form, Tab, Tabs, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../material/Profile.css';
import { toast } from 'react-toastify';
import { Button as MUIButton } from '@mui/material';
import { AWS_S3_CONFIG } from '../../config';
import ReactS3Client from 'react-aws-s3-typescript';

const Profile = () => {
  const { updateProfile, changePassword } = useAuth();
  const [passErr, setPassErr] = React.useState('');
  const [objUser, setObjUser] = React.useState<AuthUser>({});
  const [user, setUser] = React.useState({});
  const [image, setImage] = React.useState('');
  const [file, setFile] = React.useState('');

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data } = await _axios.get('/api/user/get-profile-by-token/');
    setUser(data.data);
    setObjUser(data.data);
  };

  const [updatePasswordState, setObjUpdatePassword] = React.useState({
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

  const s3Config = {
    bucketName: 'dint',
    region: 'us-east-2',
    accessKeyId: AWS_S3_CONFIG.accessKeyId,
    secretAccessKey: AWS_S3_CONFIG.secretAccessKey
  };

  // function of updating user's profile information
  const informationUpdate = async () => {
    try {
      await updateProfile({ ...objUser });
      let id = toast.loading('Loading...', {
        autoClose: 6000
      });
      const s3 = new ReactS3Client(s3Config);
      try {
        if (image.length > 0 && file) {
          const res = await s3.uploadFile(file);
          toast.update(id, {
            render: 'Image Uploaded',
            type: 'success',
            isLoading: false
          });
          saveData(id, {
            ...objUser,
            profile_image: res.location
          });
        } else {
          saveData(id, objUser);
        }
      } catch (err) {
        toast.dismiss();
        toast.error(err);
      }
    } catch (e) {
      console.log(e);
      toast.dismiss();
    }
  };

  const saveData = async (id, data) => {
    let result = await _axios.put('api/user/update-profile-by-token/', data);
    if (result.data.data) {
      const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
      localStorage.setItem('userData', JSON.stringify({ ...savedUser, ...result.data.data }));
    }
    setTimeout(() => {
      toast.update(id, {
        render: 'Profile Updated Successful!',
        type: 'success',
        isLoading: false
      });
    }, 1000);
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImage(URL.createObjectURL(file));
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
                      value={objUser?.display_name || user?.display_name || ''}
                      onChange={(e: any) => {
                        onChangeUserInfo({ display_name: e.target.value });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        value={objUser?.custom_username || user?.custom_username || ''}
                        onChange={(e: any) => {
                          onChangeUserInfo({ custom_username: e.target.value });
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={objUser?.bio || user?.bio || ''}
                      onChange={(e: any) => {
                        onChangeUserInfo({ bio: e.target.value });
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
              <div className="profile_div_child profile_img_div d-flex align-items-center justify-content-center flex-column">
                <div id="edit_image_print">
                  <img
                    id="profile_image_edit"
                    alt="profile_image_edit"
                    src={image || user?.profile_image}
                  />
                </div>
                <MUIButton variant="contained" component="label">
                  <input
                    hidden
                    accept="video/*,image/*"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                  />
                  Select Image
                </MUIButton>
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
