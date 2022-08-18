// @ts-nocheck
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
import { toast } from 'react-toastify';
import _axios from 'frontend/api/axios';

const PostItem = ({
  userName,
  description,
  image,
  createdAt,
  post
}: {
  image?: string;
  userName: string;
  description: string;
  createdAt: string;
  post: Object;
}) => {
  const theme = useTheme();
  const images = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg'];
  const videos = ['mp4', '3gp', 'ogg'];

  const url = new URL(image ?? 'https://google.com');
  const extension = url.pathname.split('.')[1];

  const sendLike = async () => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!user.id) {
      toast.error("Can't find User");
      return;
    }
    const data = {
      user: user.id,
      post: post.id
    };
    const { res } = await _axios.post('/api/posts/create/', data);
    console.log(res);
    toast.success('Like Added Successful!');
  };
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
              <Avatar src={post.profile_image}>{post.first_name ?? 'UN'}</Avatar>
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
        {image && images.includes(extension) && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={image} alt="post" style={{ width: '100%' }} />
          </Box>
        )}

        {image && videos.includes(extension) && (
          <Box sx={{ textAlign: 'center' }}>
            <video width="100%" controls>
              <source src={image} id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          </Box>
        )}
        <Box sx={{ p: 2 }}>
          <Stack direction="row">
            <IconButton>
              <FavoriteBorderRoundedIcon />
              {/* <h5>0</h5> */}
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
