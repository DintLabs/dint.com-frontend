import { store } from 'frontend/redux/store';
import Router from 'frontend/routes';
import ThemeConfig from 'frontend/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import AdminProtaction from './AdminProtaction';
import './App.css';
// import EventForAll from './EventForAll.js';
// import Events from './Events.js';
// import Login from './Login.js';
// import Profile from './Profile.js';
// import Protected from './Protected ';
// import Routes_Marketplace from './Routes_Marketplace.js';
// // import Home from './Home.js';
// import Signup from './Signup.js';
// import TicketCreate from './TicketCreate.js';

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeConfig>
          <Router />
        </ThemeConfig>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;

// <Route path="/buytoken" element={<h1>Buy Ticket</h1>} />

// <Route
//   path="/ticketcreate"
//   element={
//     <Protected
//       cmp={TicketCreate}
//       pagename="ticketcreate"
//       logout={setLoginfalse}
//       isAdmin={isadmin}
//       islogin={loggedin}
//     />
//   }
// />
