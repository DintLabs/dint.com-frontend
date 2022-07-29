// import { ref, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
import { useLocation } from 'react-router-dom';
import '../material/tickets.css';
// import { db } from './Firebase';
import NavbarHome from './NavbarHome';

const TicketCreate = (props: {
  islogin: any;
  logout: any;
  isAdmin: any;
  setaddress: any;
  setchain: any;
}) => {
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100000 + 999999));
  const location = useLocation();
  console.log(location, 'location');
  //   const ticketData = {
  //     Userid: location.state.userid,
  //     Eventid: location.state.eventid,
  //     Authid: randomNum
  //   };

  useEffect(() => {
    intervalfunc();
    // set(ref(db, `tickets/${location.state.userid}`), ticketData)
    //   .then(() => {
    //     console.log('Ticket creation done');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     alert('Error in Ticket Create');
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const intervalfunc = () => {
    setInterval(() => {
      const rand = Math.floor(Math.random() * 100000 + 999999);
      setRandomNum(rand);
      //   updateAuthid(rand);
    }, 60000);
  };

  //   const updateAuthid = (rand: any) => {
  //     update(ref(db, `tickets/${location.state.userid}`), { authid: rand })
  //       .then(() => {
  //         console.log('authid update success');
  //       })
  //       .catch((error) => {
  //         alert(`error in update${error}`);
  //       });
  //   };

  return (
    <>
      <NavbarHome
        isloggedin={props.islogin}
        logout={props.logout}
        isadmin={props.isAdmin}
        setaddress={props.setaddress}
        setchain={props.setchain}
      />
      <div style={{ textAlign: 'center' }}>
        {' '}
        <div id="ticket_parent_div">
          <h1>Use Dint Scanner</h1>
          <br />
          {/* <QRCode
            value={`Eventid :${location.state.eventid}, Userid:${location.state.userid} authid:${randomNum}`}
            style={{ fill: 'red' }}
          /> */}
          ,<br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <h1>{randomNum}</h1>
          </div>
          <p>For security purposes your ticket regenerates every 60 seconds.</p>
        </div>
      </div>
    </>
  );
};

export default TicketCreate;
