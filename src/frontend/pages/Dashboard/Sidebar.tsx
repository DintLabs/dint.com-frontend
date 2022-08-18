import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Sidebar = () => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);

  return (
    <>
      <List>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.HOME === selectedMenu ? 'text.primary' : 'text.secondary',
            cursor: 'pointer'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
          }}
        >
          <ListItemAvatar>
            <OtherHousesIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Home</Typography>} />
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MESSAGES === selectedMenu ? 'text.primary' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MESSAGES }));
          }}
        >
          <ListItemAvatar>
            <TextsmsRoundedIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Messages</Typography>} />
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MY_PROFILE === selectedMenu ? 'text.primary' : 'text.secondary'
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MY_PROFILE }));
          }}
        >
          <ListItemAvatar>
            <AccountCircleRoundedIcon />
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">My Profile</Typography>} />
        </ListItem>

        <ListItem sx={{ justifyContent: 'center', mt: 6 }}>
          <Button
            startIcon={<AddRoundedIcon />}
            variant="contained"
            onClick={() => {
              dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.ADD_POST }));
            }}
          >
            New Post
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default Sidebar;
