// @ts-nocheck
/* eslint-disable */

import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import {
  Avatar,
  Badge,
  Box,
  Button as MUIButton,
  IconButton,
  Stack,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import Tab from '@mui/material/Tab';
import _axios from 'frontend/api/axios';
import PostItemSkeleton from 'frontend/components/common/skeletons/PostItemSkeleton';
import { DEFAULT_POSTS_PAGINATION, postTypes } from 'frontend/data';
import useAuth from 'frontend/hooks/useAuth';
import { uploadCoverPhoto } from 'frontend/services/profileService';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import DiscordIcon from '../../assets/img/web3/discord.png';
import InstagramIcon from '../../assets/img/web3/instagram.png';
import TwitterIcon from '../../assets/img/web3/twitter.png';
import PostItem from './PostItem';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const MyProfile = ({ widthScreen, username }: { widthScreen: any; username: string | null }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [userDetails, setUserDetails] = React.useState([]);
  const [filter, setFilter] = React.useState('posts');
  const [isLoading, setIsLoading] = useState(false);

  const [counts, setCounts] = useState(null);
  const [posts, setPosts] = useState([]);
  const [photoPosts, setPhotoPosts] = useState([]);
  const [textPosts, setTextPosts] = useState([]);
  const [videoPosts, setVideoPosts] = useState([]);

  const [paginationPosts, setPaginationPosts] = useState(DEFAULT_POSTS_PAGINATION);
  const [paginationPhotoPosts, setPaginationPhotoPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.image.value
  });
  const [paginationTextPosts, setPaginationTextPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.text.value
  });
  const [paginationVideoPosts, setPaginationVideoPosts] = useState({
    ...DEFAULT_POSTS_PAGINATION,
    post_type: postTypes.video.value
  });

  const handleScroll = useCallback(() => {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const currentHeight = windowHeight + window.pageYOffset;
    if (currentHeight + 900 >= docHeight) {
      if (!isLoading) {
        let pagination = null;
        if (value === 0) {
          pagination = paginationPosts;
        } else if (value === 1) {
          pagination = paginationTextPosts;
        } else if (value === 2) {
          pagination = paginationPhotoPosts;
        } else if (value === 3) {
          pagination = paginationVideoPosts;
        }
        if (pagination && !isLoading && pagination.hasNext) {
          fetchPosts(userDetails?.id, { ...pagination, start: pagination.start + 5 });
        }
      }
    }
  }, [
    paginationPosts,
    paginationPhotoPosts,
    paginationTextPosts,
    paginationVideoPosts,
    isLoading,
    value,
    userDetails
    // params,
    // setParams
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserPostCounts = async (userId) => {
    const { data } = await _axios.get(`/api/posts/fetch-post-counts/${userId}/`);
    if (data?.code === 200) {
      setCounts(data?.data);
    }
  };

  const setHasNextFalse = (postType) => {
    if (postType === postTypes.all.value) {
      setPaginationPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.text.value) {
      setPaginationTextPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.image.value) {
      setPaginationPhotoPosts((p) => ({ ...p, hasNext: false }));
    } else if (postType === postTypes.video.value) {
      setPaginationVideoPosts((p) => ({ ...p, hasNext: false }));
    }
  };

  const fetchPosts = async (userId, pagination) => {
    if (isLoading || !pagination.hasNext) return;
    try {
      setIsLoading(true);
      const { data } = await _axios.post(
        `/api/posts/pagination/list_by_user_id/${userId}/`,
        pagination
      );
      setIsLoading(false);
      if (data?.data?.length) {
        if (pagination.post_type === postTypes.all.value) {
          setPosts((p) => [...p, ...data.data]);
          setPaginationPosts(pagination);
        } else if (pagination.post_type === postTypes.text.value) {
          setTextPosts((p) => [...p, ...data.data]);
          setPaginationTextPosts(pagination);
        } else if (pagination.post_type === postTypes.image.value) {
          setPhotoPosts((p) => [...p, ...data.data]);
          setPaginationPhotoPosts(pagination);
        } else if (pagination.post_type === postTypes.video.value) {
          setVideoPosts((p) => [...p, ...data.data]);
          setPaginationVideoPosts(pagination);
        }
      } else {
        setHasNextFalse(pagination.post_type);
      }
    } catch (err) {
      setIsLoading(false);
      setHasNextFalse(pagination.post_type);
    }
  };

  React.useEffect(async () => {
    if (username) {
      setValue(0);
      try {
        const { data } = await _axios.post('/api/user/get-profile-by-username/', {
          custom_username: username
        });
        setUserDetails(data.data);
        if (data.data) {
          getUserPostCounts(data.data?.id);
          fetchPosts(data.data?.id, paginationPosts);
        }
      } catch (err) {
        // if (err?.response?.status === 404)
        navigate('/404');
        // toast.error('Unable to Get User Profile Data');
      }
    }
  }, [username]);

  useEffect(() => {
    let list = [];
    let pagination = null;
    if (value === 0) {
      list = JSON.parse(JSON.stringify(posts));
      pagination = JSON.parse(JSON.stringify(paginationPosts));
    } else if (value === 1) {
      list = JSON.parse(JSON.stringify(textPosts));
      pagination = JSON.parse(JSON.stringify(paginationTextPosts));
    } else if (value === 2) {
      list = JSON.parse(JSON.stringify(photoPosts));
      pagination = JSON.parse(JSON.stringify(paginationPhotoPosts));
    } else if (value === 3) {
      list = JSON.parse(JSON.stringify(videoPosts));
      pagination = JSON.parse(JSON.stringify(paginationVideoPosts));
    }
    if (!list?.length) {
      fetchPosts(userDetails?.id, pagination);
    }
  }, [value]);

  const onChangeFilter = (e) => {
    const type = e.target.value;
    setFilter(type);
  };

  const copyToClipBoard = () => {
    const profileUrl = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(profileUrl);
  };

  const handleSocialIconClick = (url) => {
    window.open(url, '_blank');
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length) {
      let result = await uploadCoverPhoto(e.target.files[0]);
      if (result.success) {
        setUserDetails({ ...userDetails, banner_image: result?.data?.banner_image || '' });
      }
      toast.dismiss();
    }
  };

  const postDeleted = (postId) => {
    console.log('postDeleted called ===>', postId, posts);
    setPosts((p) => p.filter((prev) => prev.id != postId));
    setTextPosts((p) => p.filter((prev) => prev.id != postId));
    setPhotoPosts((p) => p.filter((prev) => prev.id != postId));
    setVideoPosts((p) => p.filter((prev) => prev.id != postId));
    getUserPostCounts(userDetails?.id);
  };

  if (!user)
    return (
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Under Contruction
      </Typography>
    );
  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`
        }}
      >
        <Box
          style={{
            borderBottom: `8px solid ${theme.palette.grey[700]}`
          }}
          sx={{ pb: 2 }}
        >
          <Box sx={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
                height: 250,
                backgroundImage: `url(${
                  userDetails?.banner_image ? userDetails?.banner_image : ''
                })`
              }}
            >
              {username == savedUser?.custom_username && (
                <MUIButton variant="contained" component="label" sx={{ m: 1 }}>
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                  Edit cover photo
                </MUIButton>
              )}
            </div>
            {/* <img src={userCoverImg} alt="user-conver" style={{ width: '100%', height: 250 }} /> */}
            <Stack direction="row" justifyContent="space-between">
              <Box sx={{ position: 'relative', bottom: 15, left: 20, right: 30 }}>
                <Badge
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  color="success"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <Avatar src={userDetails.profile_image} sx={{ width: 75, height: 75 }} />
                </Badge>
              </Box>
              <IconButton onClick={copyToClipBoard}>
                <LaunchRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {userDetails.display_name}
            </Typography>
            <input type="hidden" id="dummy" />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              @{userDetails.custom_username} &#8226; Avaliable Now
            </Typography>
          </Box>
          {userDetails?.bio && (
            <Box sx={{ px: 2, pt: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', fontSize: '12px' }}>
                {userDetails.bio}
              </Typography>
            </Box>
          )}
          <Box display={'flex'} gap={1} sx={{ p: 2 }}>
            {!!userDetails?.instagram && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.instagram)}
              >
                <img src={InstagramIcon} height="20" width="20" />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Instagram</Typography>
              </Box>
            )}
            {!!userDetails?.twitter && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.twitter)}
              >
                <img src={TwitterIcon} height="20" width="20" style={{ borderRadius: 10 }} />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Twitter</Typography>
              </Box>
            )}
            {!!userDetails?.discord && (
              <Box
                display={'flex'}
                justifyContent="center"
                alignItems={'center'}
                py={'4px'}
                px={'8px'}
                bgcolor={'#3a3d3a'}
                borderRadius={'12px'}
                gap={'4px'}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSocialIconClick(userDetails.discord)}
              >
                <img src={DiscordIcon} height="20" width="20" style={{ borderRadius: 10 }} />
                <Typography sx={{ color: 'white', fontSize: '14px' }}>Discord</Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
          >
            <Tab label={`All Posts (${counts?.all_posts ?? 0})`} />
            <Tab label={`Text Posts (${counts?.text_posts ?? 0})`} />
            <Tab label={`Photo Posts (${counts?.image_posts ?? 0})`} />
            <Tab label={`Video Posts (${counts?.video_posts ?? 0})`} />
          </Tabs>
        </Box>

        <div className="d-flex align-items-center justify-content-end p-3">
          {/* <h3 className="text-white me-5 m-0" style={{ whiteSpace: 'nowrap' }}>
            Filter :{' '}
          </h3> */}
          {/* <select class="form-select" onChange={onChangeFilter}>
            <option value="posts">All Posts</option>
            <option value="textPosts">Text Posts</option>
            <option value="videoPosts">Video Posts</option>
            <option value="photoPosts">Photo Posts</option>
          </select> */}
          {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filter}
              onChange={onChangeFilter}
              autoWidth
              label="All Posts"
            >
              <MenuItem value={'posts'}>All Posts</MenuItem>
              <MenuItem value={'textPosts'}>Text Posts</MenuItem>
              <MenuItem value={'videoPosts'}>Video Posts</MenuItem>
              <MenuItem value={'photoPosts'}>Photo Posts</MenuItem>
            </Select>
          </FormControl> */}
        </div>

        <TabPanel value={value} index={0}>
          {posts.map((item) => (
            <PostItem
              fetchPosts={() => {}}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={
                item?.user?.display_name || item?.user?.firstname || item?.user?.custom_username
              }
              custom_username={item?.user?.custom_username}
              image={item?.media}
              post={item}
              onDelete={postDeleted}
            />
          ))}
          {isLoading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {textPosts.map((item) => (
            <PostItem
              fetchPosts={() => {}}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={
                item?.user?.display_name || item?.user?.firstname || item?.user?.custom_username
              }
              custom_username={item?.user?.custom_username}
              image={item?.media}
              post={item}
              onDelete={postDeleted}
            />
          ))}
          {isLoading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {photoPosts.map((item) => (
            <PostItem
              fetchPosts={() => {}}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={
                item?.user?.display_name || item?.user?.firstname || item?.user?.custom_username
              }
              custom_username={item?.user?.custom_username}
              image={item?.media}
              post={item}
              onDelete={postDeleted}
            />
          ))}
          {isLoading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </TabPanel>

        <TabPanel value={value} index={3}>
          {videoPosts.map((item) => (
            <PostItem
              fetchPosts={() => {}}
              canDeletePost={true}
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={
                item?.user?.display_name || item?.user?.firstname || item?.user?.custom_username
              }
              image={item?.media}
              post={item}
              onDelete={postDeleted}
            />
          ))}
          {isLoading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </TabPanel>
      </Box>
    </>
  );
};

export default MyProfile;
