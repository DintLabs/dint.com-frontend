import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import { Helmet } from 'react-helmet';
import HomeTab from './HomeTab';
import Messages from './Messages';
import MyProfile from './MyProfile';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';
import { useHttp } from './httpReqHook';
import { fetchPosts, postsCreated } from '../../redux/slices/dashboard';
import { RequestMethods } from '../../types/request';
import IPost from '../../types/dashboard';

const NewHome = () => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { posts } = useSelector((rootState: RootState) => rootState.dashboard);
  // const postsLoadingStatus = useSelector((rootState: RootState) => rootState.dashboard);
  console.log(posts);

  useEffect(() => {
    fetchPosts();
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

  const onCreatePost = (e: any) => {
    e.preventDefault();
    const newPost: IPost = {
      user: 1,
      type: 'normal',
      content: 'norm'
    };

    request('http://localhost:3001/heroes', RequestMethods.POST, JSON.stringify(newPost))
      .then((res) => console.log(res, 'Success'))
      .then((res) => {
        dispatch(postsCreated(newPost));
      })
      .catch((err) => console.log(err));
  };

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
            <Sidebar onCreatePost={onCreatePost} />
          </Grid>
          <Grid item sx={styleSidebarMobile}>
            <SidebarMobile widthScreen={widthScreen} />
          </Grid>
          <Grid item xs={12} md={9}>
            {HOME_SIDE_MENU.HOME === selectedMenu && (
              <Grid container>
                <Grid item xs={12} md={8}>
                  <HomeTab widthScreen={widthScreen} />
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
