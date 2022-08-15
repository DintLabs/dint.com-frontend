import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { Avatar, Badge, Box, IconButton, Stack, Tabs, Typography, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import useAuth from 'frontend/hooks/useAuth';
import React from 'react';
import userCoverImg from '../../assets/img/web3/images.jpeg';

const MyProfile = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          borderRight: `1px solid ${theme.palette.grey[700]}`,
          height: '95vh'
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
                  <Avatar sx={{ width: 75, height: 75 }}>
                    <Typography variant="h2">NM</Typography>
                  </Avatar>
                </Badge>
              </Box>
              <IconButton>
                <LaunchRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              {user.displayName || user.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              @username &#8226; Avaliable Now
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
            <Tab label="No Posts" />
            <Tab label="No Media" />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default MyProfile;
