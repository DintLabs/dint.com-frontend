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
import { MdDelete, MdSend } from 'react-icons/md';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const PostItem = ({
  userName,
  description,
  image,
  createdAt,
  post: PropPost,
  canDeletePost,
  fetchPosts
}: {
  image?: string;
  userName: string;
  description: string;
  createdAt: string;
  post: Object;
  canDeletePost?: Boolean;
  fetchPosts: Function;
}) => {
  const [post, setPost] = React.useState(PropPost);
  const [canHeDeletePost, setCanHeDeletePost] = React.useState(false);
  const theme = useTheme();
  const images = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg'];
  const videos = ['mp4', '3gp', 'ogg', 'quicktime'];

  const url = new URL(image ?? 'https://google.com');
  const extension = url.pathname.split('.')[1];
  const [alreadyLike, setAlreadyLike] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [comments, setComments] = React.useState([]);
  const [showComments, setShowComments] = React.useState(false);

  React.useEffect(() => {
    setComments(post.post_comment);
  }, [post]);

  const sendComment = async () => {
    if (commentText.length < 1) {
      toast.error('Comment is Required!');
      return;
    }
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');

    const comment = {
      user: user.id,
      post: post.id,
      comment: commentText
    };
    const { data } = await _axios.post('api/posts/comment/', comment);
    console.log(data);
    comments.push({
      comment: commentText,
      user,
      created_at: new Date()
    });
    // toast('Comment Added Succesfull');
    setCommentText('');
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (post.like_post.find((item) => item.user.id == user.id)) {
      setAlreadyLike(true);
    }

    if (post.user.id == user.id) {
      setCanHeDeletePost(true);
    }
  }, []);

  const deletePost = async () => {
    if (!canDeletePost) {
      toast.error("User can't delte post");
    }
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!user.id) {
      toast.error("Can't find User");
      return;
    }

    const { data } = await _axios.delete('/api/posts/delete/' + post.id);
    fetchPosts();
    toast.success('Post Deleted Successful!');
  };

  const sendLike = async () => {
    if (alreadyLike) {
      toast.warn('You have Alread like this post');
      return;
    }
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!user.id) {
      toast.error("Can't find User");
      return;
    }
    const data = {
      user: user.id,
      post: post.id
    };

    setAlreadyLike(true);

    const likedPost = { ...post };

    likedPost.like_post.push({});

    fetchPosts();

    setPost((prevState) => prevState, { like_post: likedPost.like_post });
    console.log('like post ', post.like_post);

    const res = await _axios.post('/api/posts/like/', data);
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
              <Avatar src={post.user.profile_image} />
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
        <Box sx={{ p: 2 }} className="d-flex align-items-center justify-content-between">
          <Stack direction="row">
            {!alreadyLike ? (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={sendLike}
              >
                <FavoriteBorderRoundedIcon />
                <p className="m-0 small ms-2">{post.like_post.length ?? '0'}</p>
              </IconButton>
            ) : (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                  toast.warn('You have already like this post');
                }}
              >
                <FaHeart color="red" />
                <p className="m-0 small ms-2">{post.like_post.length ?? '0'}</p>
              </IconButton>
            )}
            <IconButton
              onClick={() => setShowComments(!showComments)}
              className="d-flex align-items-center justify-content-center"
            >
              <MessageRoundedIcon />
              <p className="m-0 small ms-2">{post.post_comment.length ?? '0'}</p>
            </IconButton>
          </Stack>
          {canDeletePost && canHeDeletePost ? (
            <IconButton onClick={deletePost}>
              <MdDelete />
            </IconButton>
          ) : null}
        </Box>

        {showComments && (
          <Box sx={{ p: 3 }}>
            <h4 className="text-white">Comments ({comments.length ?? 0})</h4>
            {comments?.map((item) => {
              return (
                <div class=" my-3" style={{ background: 'transparent' }}>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center">
                      <ListItemAvatar>
                        <Avatar src={post.user.profile_image} />
                      </ListItemAvatar>
                      {/* <img
                        src={item.user.profile_image}
                        width="30"
                        class="user-img rounded-circle mr-2"
                      /> */}
                      <span>
                        {/* <small class="font-weight-bold text-primary">james_olesenn</small>{' '} */}
                        <small class="text-white">{item.comment}</small>
                      </span>
                    </div>

                    <small className="text-muted">{ta.ago(new Date(item.created_at))}</small>
                  </div>
                </div>
              );
            })}

            <div className="d-flex align-items-center justify-content-center flex-row mt-3">
              <input
                style={{}}
                className="form-control w-100"
                placeholder="Enter Comment"
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <IconButton onClick={sendComment}>
                <MdSend />
              </IconButton>
            </div>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PostItem;
