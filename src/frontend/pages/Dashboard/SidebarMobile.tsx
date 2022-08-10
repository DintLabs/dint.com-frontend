import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface Props {
  widthScreen: number;
}

const SidebarMobile = ({ widthScreen }: Props) => {
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);

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
          }}
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AccountCircleRoundedIcon />
          </ListItemAvatar>
        </ListItem>
        <ListItem
          sx={{
            ...styleListItem
          }}
        >
          <Button variant="contained">
            <AddRoundedIcon />
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarMobile;
