// @ts-nocheck
/* eslint-disable */
import React, { useLayoutEffect, useEffect, useState, useCallback, useMemo } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router';

const NewHome = () => {
  const [selectedMenu, setSelectedMenu] = React.useState([]);
  // const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const [contentPost, setContentPost] = useState<string>('');
  const [posts, setPosts] = React.useState([]);
  const [userPosts, setUserPosts] = React.useState([]);
  const [profileUserPosts, setProfileUserPosts] = React.useState([]);
  const postsLoadingStatus = '';
  const [mediaPosts, setMediaPosts] = React.useState([]);
  const [textPosts, setTextPosts] = React.useState([]);
  const [videoPosts, setVideoPosts] = React.useState([]);
  const [photoPosts, setPhotoPosts] = React.useState([]);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

  useEffect(() => {
    if (selectedMenu == HOME_SIDE_MENU.HOME) {
      fetchPostsList();
    }

    if (selectedMenu == HOME_SIDE_MENU.MY_PROFILE) {
      fetUserPosts();
    }
  }, [selectedMenu]);

  const validPages = [
    HOME_SIDE_MENU.ADD_POST,
    HOME_SIDE_MENU.HOME,
    HOME_SIDE_MENU.DASHBOARD,
    HOME_SIDE_MENU.MY_PROFILE,
    HOME_SIDE_MENU.MESSAGES
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
        setSelectedMenu('userProfile');
        fetchUserProfilePosts();
      }
    } else {
      if (params.username) {
        setSelectedMenu(HOME_SIDE_MENU.MY_PROFILE);
      } else {
        setSelectedMenu(HOME_SIDE_MENU.HOME);
      }
    }
  }, [location]);

  const fetchUserPorfilePosts = () => {
    // const
  };

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

  const createPost = async (toastId, data: any) => {
    try {
      const { res } = await _axios.post('/api/posts/create/', data);
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
      fetchPostsList();
      navigate('/dashboard/home');
      dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
    } catch (err) {
      // @ts-ignore
      toast.error(err.toString());
    }
  };

  const images = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg'];
  const videos = ['mp4', '3gp', 'ogg'];

  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  const fetUserPosts = async (data: any) => {
    try {
      const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
      if (!user.id) {
        // toast.error("Can't find User");
        return;
      }

      const { data } = await _axios.get(`/api/posts/list_by_user_id/${user.id}`);
      setUserPosts(data.data);
      let posts = data.data;
      let textPosts = posts.filter((item) => !item.media);
      textPosts = textPosts.reverse();
      setTextPosts(textPosts);
      let videoPosts = posts
        .reverse()
        .filter((item) => item.media && videos.includes(get_url_extension(item.media)));
      let photoPosts = posts.filter(
        (item) => item.media && images.includes(get_url_extension(item.media))
      );
      videoPosts = videoPosts;
      photoPosts = photoPosts;
      setVideoPosts(videoPosts);
      setPhotoPosts(photoPosts);
      // alert(photoPosts.length);
    } catch (err) {}
  };

  function getFileType(file) {
    if (file.type.match('image.*')) return 'image';

    if (file.type.match('video.*')) return 'video';

    if (file.type.match('audio.*')) return 'audio';

    // etc...

    return 'other';
  }

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

  const renderComponent = useMemo(() => {
    if (
      location.pathname.includes(HOME_SIDE_MENU.HOME) ||
      location.pathname === `/${HOME_SIDE_MENU.DASHBOARD}`
    )
      return (
        <Grid container>
          <Grid item xs={12} md={8}>
            <HomeTab
              fetchPosts={fetchPostsList}
              posts={posts}
              widthScreen={widthScreen}
              createPost={createPost}
            />
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
    else
      return (
        <>
          <Grid container>
            <Grid item xs={12} md={8}>
              <MyProfile
                username={params.username}
                textPosts={textPosts}
                videoPosts={videoPosts}
                photoPosts={photoPosts}
                fetchPosts={fetchPostsList}
                posts={userPosts}
                widthScreen={widthScreen}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RightSidebar styleTerms={styleTerms} widthScreen={widthScreen} />
            </Grid>
          </Grid>
          {/* <Grid container>
              <Grid item xs={12} md={8}>
                <MyProfile
                  fetchPosts={fetchPostsList}
                  posts={userPosts}
                  widthScreen={widthScreen}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <RightSidebar styleTerms={styleTerms} widthScreen={widthScreen} />
              </Grid>
            </Grid> */}
        </>
      );
  }, [location, posts, textPosts, videoPosts, photoPosts, userPosts]);

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
            {!!user.id && <Sidebar />}
          </Grid>
          <Grid item sx={styleSidebarMobile}>
            {!!user.id && <SidebarMobile widthScreen={widthScreen} />}
          </Grid>
          <Grid item xs={12} md={9}>
            {renderComponent}
            {/* {HOME_SIDE_MENU.MY_PROFILE === 'userProfile' && (
              <Grid container>
                <Grid item xs={12} md={8}>
                  <MyProfile
                    fetchPosts={fetchPostsList}
                    posts={userPosts}
                    widthScreen={widthScreen}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <RightSidebar styleTerms={styleTerms} widthScreen={widthScreen} />
                </Grid>
              </Grid>
            )} */}
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
