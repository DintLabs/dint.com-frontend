/* eslint-disable */
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import postImg from '../../assets/img/web3/matic-token.png';
// @ts-ignore
import * as ta from 'time-ago';

const PostItem = ({
  userName,
  description,
  image,
  createdAt
}: {
  image?: string;
  userName: string;
  description: string;
  createdAt: string;
}) => {
  const theme = useTheme();
  return (
    <>
      <Box
        style={{
          borderBottom: `1px solid ${theme.palette.grey[700]}`
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={postImg}>NM</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                  {userName}
                </Typography>
              }
              secondary={
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {ta.ago(new Date(createdAt))}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {description}
          </Typography>
        </Box>
        {image && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={postImg} alt="post" />
          </Box>
        )}
        <Box sx={{ p: 2 }}>
          <Stack direction="row">
            <IconButton>
              <FavoriteBorderRoundedIcon />
            </IconButton>
            <IconButton>
              <MessageRoundedIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default PostItem;
