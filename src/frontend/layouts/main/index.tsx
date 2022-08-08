// import { createStyles, makeStyles } from '@material-ui/styles';
import { isIPhone } from 'frontend/utils';
import { Outlet } from 'react-router-dom';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavBar';

export default function MainLayout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isIPhone() ? window.innerHeight : '100vh'
      }}
    >
      <div>
        <MainNavbar />
      </div>
      <div id="page-body">
        <div>
          <Outlet />
          <MainFooter />
        </div>
      </div>
    </div>
  );
}
