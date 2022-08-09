// import { createStyles, makeStyles } from '@material-ui/styles';
import { Box } from '@mui/material';
import { isIPhone } from 'frontend/utils';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavBar';

export default function SecondaryMainNavBar() {
  const { pathname } = useLocation();

  const shouldHideFooter = !pathname.includes('/dashboard');
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
        <Box
          sx={{
            minHeight: '95vh',
            width: '100%',
            bgcolor: 'background.default'
          }}
        >
          <Container>
            <Box sx={{ pt: 3 }} />
            <Outlet />
          </Container>
          {shouldHideFooter && <MainFooter />}
        </Box>
      </div>
    </div>
  );
}
