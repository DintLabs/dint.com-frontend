import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import { Helmet } from 'react-helmet';
import HomeTab from './HomeTab';
import Messages from './Messages';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import { useHttp } from '../../hooks/httpReqHook';
import { fetchPosts, postsCreated, postsDeleted, postsUpdate } from '../../redux/slices/dashboard';
import { RequestMethods } from '../../types/request';
import IPost from '../../types/dashboard';
import useAuth from '../../hooks/useAuth';

const NewHome = () => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { posts } = useSelector((rootState: RootState) => rootState.dashboard);
  const postsLoadingStatus = useSelector((rootState: RootState) => rootState.dashboard);
  const [contentPost, setContentPost] = useState<string>('');
  const onHandle = (text: string) => {
    setContentPost(text);
  };

  useEffect(() => {
    fetchPostsList();
  }, []);

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

  const fetchPostsList = useCallback(async () => {
    await request('http://18.204.217.87:8000/api/posts/list', RequestMethods.GET)
      .then(({ data }) => {
        dispatch(fetchPosts({ data }));
      })
      .then(() => {
        console.log('List');
      })
      .catch((err) => console.log(err));
  }, [request]);

  const onCreatePost = useCallback(
    (content: string) => {
      const newPost = {
        user: 1,
        type: 'Social',
        content
      };
      request(
        'http://18.204.217.87:8000/api/posts/create/',
        RequestMethods.POST,
        JSON.stringify(newPost)
      )
        .then(({ data }) => {
          dispatch(postsCreated(data));
        })
        .then(() => {
          console.log('Create');
        })
        .catch((err) => console.log(err));
    },
    [request]
  );

  const onDelete = useCallback(
    (post: number) => {
      request(`http://18.204.217.87:8000/api/posts/delete/${post}/`, RequestMethods.DELETE)
        .then((data) => console.log(data, 'Deleted'))
        .then(() => {
          dispatch(postsDeleted(post));
        })
        .catch((err) => console.log(err));
    },
    [request]
  );

  const onUpdate = useCallback(
    (post: number) => {
      const newPost: IPost = {
        user: 1,
        type: 'normal',
        content: 'norm'
      };

      request(
        `http://18.204.217.87:8000/api/posts/update/${post}/`,
        RequestMethods.PUT,
        JSON.stringify(newPost)
      )
        .then((res) => console.log(res, 'Update'))
        .then(() => {
          dispatch(postsUpdate(newPost));
        })
        .catch((err) => console.log(err));
    },
    [request]
  );

  if (postsLoadingStatus === 'loading') {
    return <></>;
  }
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
                  <HomeTab
                    widthScreen={widthScreen}
                    onHandle={onHandle}
                    onDelete={onDelete}
                    onCreatePost={() => onCreatePost(contentPost)}
                  />
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
            {HOME_SIDE_MENU.MY_PROFILE === selectedMenu && <MyProfile />}
            {HOME_SIDE_MENU.MESSAGES === selectedMenu && <Messages widthScreen={widthScreen} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewHome;
