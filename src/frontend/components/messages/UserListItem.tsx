import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Object } from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router';

type UserListItemProps = {
  id: number;
  profile: string | any;
  name: string;
  caption: string;
  isSelected?: boolean;
  onClickHandler?: () => void;
};

function UserListItem(props: UserListItemProps) {
  const navigate = useNavigate();
  return (
    <Stack
      className={`cursor-pointer user-list-item ${props.isSelected ? 'selected-user' : ''}`}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ px: { xs: 0.5, md: 1, xl: 2 }, py: 1 }}
      component="div"
      onClick={() => {
        if (props.onClickHandler) {
          props.onClickHandler();
        }
        navigate(`/lounge/messages/user/${props.id}`);
      }}
    >
      <Avatar src={props.profile} />
      <Stack direction="column">
        <Typography className="primary-text-color">{props.name}</Typography>
        <Typography variant="caption" className="secondary-text-color">
          {props.caption}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default UserListItem;
