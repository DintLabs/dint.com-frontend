import { Box, Grid, Typography } from '@mui/material';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { RootState, useSelector } from 'frontend/redux/store';
import { Helmet } from 'react-helmet';
import HomeTab from './HomeTab';
import Messages from './Messages';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';

const NewHome = () => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>

      <Box>
        <Grid container>
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            {HOME_SIDE_MENU.HOME === selectedMenu && (
              <Grid container>
                <Grid item xs={8}>
                  <HomeTab />
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 2, pt: 3 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Privacy Policy
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Cookie Notice
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Terms of Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            {HOME_SIDE_MENU.MY_PROFILE === selectedMenu && <MyProfile />}
            {HOME_SIDE_MENU.MESSAGES === selectedMenu && <Messages />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewHome;
