import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Input, Stack, Button, useTheme } from '@mui/material';
import './navbarTab.css';
// @ts-ignore
import { toast } from 'react-toastify';

interface Props {
  widthScreen: number;
  createPost: Function;
}

const AddPost = ({ widthScreen, createPost }: Props) => {
  const [content, setContent] = React.useState('');
  const theme = useTheme();

  const onCreatePost = () => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!user.id) {
      toast.error("Can't find User");
      return;
    }

    if (content.length < 1) {
      toast.error('Post Description is Required!');
      return;
    }

    createPost({
      type: 'Social',
      user: user.id,
      content
    });
    setContent('');
  };
  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`
        }}
        sx={{ height: widthScreen >= 900 ? '90vh' : 'full', overflowY: 'scroll' }}
      >
        {/* <Box
          style={{
            borderBottom: `1px solid ${theme.palette.grey[700]}`
          }}
          sx={{ p: 2 }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            Add New Post
          </Typography>
        </Box> */}

        <Box sx={{ borderRadius: 3 }} className="shadow p-3 bg-dark m-3">
          <Input
            multiline
            rows={4}
            disableUnderline={true}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ borderBottom: '1px solid grey' }}
            placeholder="Compose new post..."
          />
          <Stack className="d-flex justify-content-between align-items-center flex-row mt-2">
            <Stack className="d-flex align-items-center justify-content-center flex-row">
              <IconButton>
                <ImageIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Stack>

            <Button onClick={onCreatePost} variant="contained">
              Publish
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AddPost;
