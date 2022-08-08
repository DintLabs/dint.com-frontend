// import { createStyles, makeStyles } from '@material-ui/styles';
import { isIPhone } from 'frontend/utils';
import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavBar';

export default function MainLayout() {
  const { pathname } = useLocation();

  const shouldHideFooter = !pathname.includes('/new-home');
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
          {shouldHideFooter && <MainFooter />}
        </div>
      </div>
    </div>
  );
}
