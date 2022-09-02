// @ts-nocheck
/* eslint-disable */
import { Box, Grid, Typography } from '@mui/material';
import _axios from 'frontend/api/axios';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
// @ts-ignore
import { toast } from 'react-toastify';

import Messages from '../Messages/Messages';
import AddPost from './AddPost';
import HomeTab from './HomeTab';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
// @ts-ignore
import { useLounge } from 'frontend/contexts/LoungeContext';
import { useLocation, useNavigate, useParams } from 'react-router';
import Subscriptions from '../Subscriptions/Subscriptions';

const NewHome = () => {
  const {
    addNewPostToContext
  } = useLounge();
  const [selectedMenu, setSelectedMenu] = React.useState([]);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const validPages = [
    HOME_SIDE_MENU.ADD_POST,
    HOME_SIDE_MENU.HOME,
    HOME_SIDE_MENU.LOUNGE,
    // HOME_SIDE_MENU.MY_PROFILE,
    HOME_SIDE_MENU.MESSAGES,
    HOME_SIDE_MENU.SUBSCRIPTIONS
  ];
  React.useEffect(() => {
    // alert(params.page);
    if (params.page) {
      if (!params.username) {
        if (validPages.includes(params.page)) {
          setSelectedMenu(params.page);
        } else {
          navigate('/404');
        }
      } else {
        navigate('/404');
      }
    } else {
      if (params.username) {
        setSelectedMenu(HOME_SIDE_MENU.MY_PROFILE);
      } else {
        setSelectedMenu(HOME_SIDE_MENU.HOME);
      }
    }
  }, [location]);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const styleSidebarMobile = {
    display: widthScreen >= 900 ? 'none' : '',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: '120'
  };

  const styleTerms = {
    p: 2,
    pt: 3,
    pb: 3,
    display: widthScreen >= 900 ? '' : 'flex',
    justifyContent: widthScreen >= 900 ? '' : 'center',
    alignItems: widthScreen >= 900 ? '' : 'center',
    mb: 8
  };

  const createPost = async (toastId, data: any) => {
    try {
      const result = await _axios.post('/api/posts/create/', data);
      if (result?.data?.data) addNewPostToContext(result.data.data);
      setTimeout(() => {
        toast.update(toastId, {
          render: 'Post Added Successful!',
          type: 'success',
          isLoading: false
        });
      }, 1000);

      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    } catch (err) {
      // @ts-ignore
      toast.error(err.toString());
    }
  };

  const renderComponent = useMemo(() => {
    if (
      location.pathname.includes(HOME_SIDE_MENU.HOME) ||
      location.pathname === `/${HOME_SIDE_MENU.LOUNGE}`
    )
      return (
        <Grid container>
          <Grid item xs={12} md={8}>
            <HomeTab widthScreen={widthScreen} createPost={createPost} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RightSidebar styleTerms={styleTerms} widthScreen={widthScreen} />
          </Grid>
        </Grid>
      );
    else if (location.pathname.includes(HOME_SIDE_MENU.MESSAGES))
      return <Messages widthScreen={widthScreen} />;
    else if (location.pathname.includes(HOME_SIDE_MENU.ADD_POST))
      return <AddPost widthScreen={widthScreen} createPost={createPost} />;
    else if (location.pathname.includes(HOME_SIDE_MENU.SUBSCRIPTIONS)) return <Subscriptions />;
    else
      return (
        <>
          <Grid container>
            <Grid item xs={12} md={8}>
              <MyProfile username={params.username} widthScreen={widthScreen} />
            </Grid>
            <Grid item xs={12} md={4}>
              <RightSidebar styleTerms={styleTerms} widthScreen={widthScreen} />
            </Grid>
          </Grid>
        </>
      );
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Lounge</title>
        <meta
          name="description"
          content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
        />
      </Helmet>
      <Box>
        <Grid container>
          <Grid item xs={0} md={3} sx={{ display: widthScreen >= 900 ? '' : 'none' }}>
            {!!user.id && <Sidebar />}
          </Grid>
          <Grid item sx={styleSidebarMobile}>
            {!!user.id && <SidebarMobile widthScreen={widthScreen} />}
          </Grid>
          <Grid item xs={12} md={9}>
            {renderComponent}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const RightSidebar = ({ styleTerms, widthScreen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={styleTerms}>
        <Typography
          variant="body2"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/privacy')}
          sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="body2"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/cookies')}
          sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
        >
          Cookie Notice
        </Typography>
        <Typography
          variant="body2"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/terms')}
          sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
        >
          Terms of Service
        </Typography>
      </Box>
    </>
  );
};

export default NewHome;
