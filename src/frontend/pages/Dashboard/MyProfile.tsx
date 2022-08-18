// @ts-nocheck
/* eslint-disable */

import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { Avatar, Badge, Box, IconButton, Stack, Tabs, Typography, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import _axios from 'frontend/api/axios';
import useAuth from 'frontend/hooks/useAuth';
import React from 'react';
import userCoverImg from '../../assets/img/web3/images.jpeg';
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

const MyProfile = ({ posts, widthScreen }: { posts: any; widthScreen: any }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [userDetails, setUserDetails] = React.useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(async () => {
    const { data } = await _axios.get('/api/user/get-profile-by-token/');
    setUserDetails(data.data);
  }, []);

  console.log(user);
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
            <img src={userCoverImg} alt="user-conver" style={{ width: '100%', height: 250 }} />
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
              <IconButton>
                <LaunchRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {userDetails.display_name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              @{userDetails.custom_username} &#8226; Avaliable Now
            </Typography>
          </Box>
        </Box>
        <Box>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
          >
            <Tab label={`${posts.length ?? 0} Posts`} />
            <Tab label="No Media" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {posts.map((item) => (
            <PostItem
              key={item?.created_at}
              description={item?.content}
              createdAt={item?.created_at}
              userName={item.user.firstname}
              image={item?.media}
              post={item}
            />
          ))}
        </TabPanel>
      </Box>
    </>
  );
};

export default MyProfile;
