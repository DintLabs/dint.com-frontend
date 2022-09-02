import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/system';
import React, { SyntheticEvent, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router';
import TabPanel from 'frontend/components/common/TabPanel';
import coverPhoto from '../../material/images/create-page-cover-photo.png';

const ViewPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleTabSelection = (event: SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <Stack direction="row" className="view-page-container">
      {/* left-side creator's menu */}
      <Stack className="left-side-panel" direction="column">
        {/* navigation menu */}
        <List className="navigation-menu">
          <ListItem
            className="secondary-text-color navigation-menu-item"
            onClick={() => navigate('/page/creation')}
          >
            <ListItemAvatar>
              <EditIcon />
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Edit Page</Typography>} />
          </ListItem>
          <ListItem className="secondary-text-color navigation-menu-item">
            <ListItemAvatar>
              <SettingsIcon />
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Settings</Typography>} />
          </ListItem>
        </List>
      </Stack>

      {/* center side view page and creator page */}
      <Stack direction="column" className="center-page-container">
        {/* page-profile-section */}
        <Box className="page-profile-section">
          {/* Cover photo */}
          <Box
            className="cover-photo-container"
            sx={{
              backgroundImage: `url(${coverPhoto})`
            }}
          />
          {/* Profile details */}
          <Grid container sx={{ p: 1 }}>
            <Grid item sm={12} md={4} lg={2}>
              <Avatar
                sx={{ width: 88, height: 88, mt: -2.5 }}
                // src={uploadedProfilePicture[0]?.preview}
              />
            </Grid>
            <Grid item sm={12} md={8} lg={9}>
              <Stack direction="column">
                <Typography variant="h2" className="primary-text-color">
                  Page name
                </Typography>
                <Typography variant="body1" className="secondary-text-color">
                  Category
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Tabs
              value={selectedTabIndex}
              variant="scrollable"
              onChange={handleTabSelection}
              sx={{
                maxWidth: { xs: 320, sm: 480 }
              }}
            >
              <Tab label="Home" />
              <Tab label="About" />
              <Tab label="Photos" />
              <Tab label="Videos" />
            </Tabs>
          </Stack>
        </Box>
        {/* Tabs body container */}
        <TabPanel value={selectedTabIndex} index={0}>
          <Box className="tab-body">
            <Grid container spacing={2}>
              <Grid item sm={12} md={5} lg={5}>
                <Card className="info-cards">
                  <Stack className="card-header">
                    <Typography>About</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <HiInformationCircle />
                    <Typography variant="body2" className="text-break">
                      Description ...
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
              <Grid item sm={12} md={7} lg={7}>
                <Card className="info-cards">
                  <Stack className="card-header" direction="row" alignItems="center" spacing={1}>
                    <Avatar />
                    <Button variant="contained" fullWidth>
                      Create Post
                    </Button>
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={4} lg={4}>
                      <Typography variant="body2">Photo/video</Typography>
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                      <Typography variant="body2">Tag people</Typography>
                    </Grid>
                    <Grid item sm={12} md={4} lg={4}>
                      <Typography variant="body2">Check In</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Stack>

      {/* right side view panel */}
      <Stack className="right-side-panel">Subscription Section</Stack>
    </Stack>
  );
};

export default ViewPage;
