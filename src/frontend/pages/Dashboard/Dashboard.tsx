/* eslint-disable */
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { RootState, useSelector, useDispatch } from 'frontend/redux/store';
import { Helmet } from 'react-helmet';
import _axios from 'frontend/api/axios';
// @ts-ignore
import { toast } from 'react-toastify';

import HomeTab from './HomeTab';
import Messages from './Messages';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import AddPost from './AddPost';
// @ts-ignore
import { dispatch } from 'frontend/redux/store';

const NewHome = () => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [contentPost, setContentPost] = useState<string>('');
  const [posts, setPosts] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);
  const postsLoadingStatus = '';

  useEffect(() => {
    if (selectedMenu == HOME_SIDE_MENU.HOME) {
      fetchPostsList();
    }

    if (selectedMenu == HOME_SIDE_MENU.MY_PROFILE) {
      fetUserPosts();
    }
  }, [selectedMenu]);

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

  const fetchPostsList = async () => {
    try {
      const { data } = await _axios.get('/api/posts/list');
      setPosts(data.data.reverse());
    } catch (err) {}
  };

  const createPost = async (data: any) => {
    try {
      const { res } = await _axios.post('/api/posts/create/', data);
      toast.success('Post Created Successful!');
      dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
    } catch (err) {
      // @ts-ignore
      toast.error(err.toString());
    }
  };

  const fetUserPosts = async (data: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
      if (!user.id) {
        toast.error("Can't find User");
        return;
      }

      const { data } = await _axios.get(`/api/posts/list_by_user_id/${user.id}`);
      setUserPosts(data.data.reverse());
    } catch (err) {}
  };

  const onDelete = () => {};

  const onUpdate = () => {};

  // @ts-ignore
  if (postsLoadingStatus === 'loading') {
    return <></>;
  }
  // @ts-ignore
  if (postsLoadingStatus === 'error') {
    return <h5>Error</h5>;
  }

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
          <Grid item xs={0} md={3} sx={{ display: widthScreen >= 900 ? '' : 'none' }}>
            <Sidebar />
          </Grid>
          <Grid item sx={styleSidebarMobile}>
            <SidebarMobile widthScreen={widthScreen} />
          </Grid>
          <Grid item xs={12} md={9}>
            {HOME_SIDE_MENU.HOME === selectedMenu && (
              <Grid container>
                <Grid item xs={12} md={8}>
                  <HomeTab posts={posts} widthScreen={widthScreen} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={styleTerms}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Privacy Policy
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Cookie Notice
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Terms of Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            {HOME_SIDE_MENU.MY_PROFILE === selectedMenu && (
              <Grid container>
                <Grid item xs={12} md={8}>
                  <MyProfile posts={userPosts} widthScreen={widthScreen} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={styleTerms}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Privacy Policy
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Cookie Notice
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', px: widthScreen >= 900 ? 0 : 1 }}
                    >
                      Terms of Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            )}
            {HOME_SIDE_MENU.MESSAGES === selectedMenu && <Messages widthScreen={widthScreen} />}
            {HOME_SIDE_MENU.ADD_POST === selectedMenu && (
              <AddPost widthScreen={widthScreen} createPost={createPost} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewHome;
