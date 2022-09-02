// @ts-nocheck
/* eslint-disable */
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import EventIcon from '@mui/icons-material/Event';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router';

interface Props {
  widthScreen: number;
}

const SidebarMobile = ({ widthScreen }: Props) => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const styleListItem = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: widthScreen > 375 ? '' : '0px'
  };

  return (
    <>
      <List sx={{ display: 'flex', backgroundColor: 'black' }}>
        <ListItem
          sx={{
            color: HOME_SIDE_MENU.HOME === selectedMenu ? 'text.primary' : 'text.secondary',
            cursor: 'pointer',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
            navigate('/lounge/' + HOME_SIDE_MENU.HOME);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OtherHousesIcon />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MESSAGES === selectedMenu ? 'text.primary' : 'text.secondary',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MESSAGES }));
            navigate('/lounge/' + HOME_SIDE_MENU.MESSAGES);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextsmsRoundedIcon />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          sx={{
            cursor: 'pointer',
            color: HOME_SIDE_MENU.MY_PROFILE === selectedMenu ? 'text.primary' : 'text.secondary',
            ...styleListItem
          }}
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MY_PROFILE }));
            navigate('/' + user?.custom_username);
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AccountCircleRoundedIcon />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.ADD_POST }));
            navigate('/lounge/' + HOME_SIDE_MENU.ADD_POST);
          }}
          sx={{
            ...styleListItem
          }}
        >
          <Button variant="contained">
            <AddRoundedIcon />
          </Button>
        </ListItem>
        <ListItem
          onClick={() => {
            dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.MY_EVENT }));
            navigate('/lounge/events');
          }}
          sx={{
            ...styleListItem
          }}
        >
          <Button variant="contained">
            <EventIcon />
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMobile;
