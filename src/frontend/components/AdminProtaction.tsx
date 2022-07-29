import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { get, child, ref } from 'firebase/database';
import { auth, db } from './Firebase';
import Admin from './Admin';
import AdminerrorSvg from '../material/adminerr.svg';

const AdminProtaction = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);

  const adminBtnCss = {
    padding: '10px',
    borderRadius: '15px',
    backgroundColor: '#6C63FF',
    border: 'none',
    margin: '10px'
  };

  const checkusertype = async (uid) => {
    await get(child(ref(db), `users/${uid}/role`))
      .then((snapshot) => {
        // sessionStorage.setItem('role',snapshot.val())
        console.log(snapshot.val());
        if (snapshot.val() == 'admin') {
          setIsAdmin(true);
        } else {
          console.log('false');
        }
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsloggedin(true);
        console.log(user);
        const { uid } = user;

        checkusertype(uid);
      } else {
        console.log('user is not loggedin');
      }
    });
  }, []);

  const navigate = useNavigate();

  // var isLoggedin = sessionStorage.getItem("logged");
  // var role = sessionStorage.getItem("role");

  if (!isloggedin) {
    return (
      <>
        <img src={AdminerrorSvg} alt="" height="200px" />
        <h1>You are not Admin</h1>
        <button
          style={adminBtnCss}
          onClick={() => {
            navigate('/login/admin');
          }}
        >
          Login
        </button>{' '}
        <button
          style={adminBtnCss}
          onClick={() => {
            navigate('/');
          }}
        >
          Go Back
        </button>
      </>
    );
  }
  if (isAdmin) {
    return (
      <>
        <Admin />
      </>
    );
  }
  return (
    <>
      <img src={AdminerrorSvg} alt="" height="200px" />
      <h1>You are not Admin</h1>
      <button
        style={adminBtnCss}
        onClick={() => {
          navigate('/login/admin');
        }}
      >
        Login
      </button>{' '}
      <button
        style={adminBtnCss}
        onClick={() => {
          navigate('/');
        }}
      >
        Go Back
      </button>
    </>
  );
};

export default AdminProtaction;
