/* eslint-disable */
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Input, Stack, Button, useTheme } from '@mui/material';
import './navbarTab.css';
// @ts-ignore
import { toast } from 'react-toastify';
import ReactS3Client from 'react-aws-s3-typescript';
import { AWS_S3_CONFIG } from '../../config';

interface Props {
  widthScreen: number;
  createPost: Function;
}

const AddPost = ({ widthScreen, createPost }: Props) => {
  const [content, setContent] = React.useState('');
  const [file, setFile] = useState<any>({});
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [image, setImage] = React.useState('');
  const theme = useTheme();

  const s3Config = {
    bucketName: 'dint',
    region: 'us-east-2',
    accessKeyId: AWS_S3_CONFIG.accessKeyId,
    secretAccessKey: AWS_S3_CONFIG.secretAccessKey
  };

  const onCreatePost = async () => {
    const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
    if (!user.id) {
      toast.error("Can't find User");
      return;
    }

    if (content.length < 1) {
      toast.error('Post Description is Required!');
      return;
    }

    if (isFileUploaded && file) {
      console.log(s3Config);
      const s3 = new ReactS3Client(s3Config);
      console.log(s3);
      try {
        const res = await s3.uploadFile(file);
        console.log(res);
        createPost({
          type: 'Social',
          user: user.id,
          content
        });
      } catch (exception) {
        console.log(exception);
        console.debug(exception);
      }
    } else {
      createPost({
        type: 'Social',
        user: user.id,
        content
      });
    }

    setContent('');
    setFile(null);
    setIsFileUploaded(false);
    setImage('');
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setIsFileUploaded(true);
    setImage(URL.createObjectURL(file));
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
            placeholder="Compose new post..."
          />
          <img src={image} />
          <div style={{ borderBottom: '1px solid grey' }} className="w-100" />
          <Stack className="d-flex justify-content-between align-items-center flex-row mt-2">
            <Stack className="d-flex align-items-center justify-content-center flex-row">
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="video/*,image/*"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
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
