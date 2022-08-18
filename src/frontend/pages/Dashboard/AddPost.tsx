// @ts-nocheck
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
  const [video, setVideo] = React.useState('');
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);

  const s3Config = {
    bucketName: 'dint',
    region: 'us-east-2',
    accessKeyId: AWS_S3_CONFIG.accessKeyId,
    secretAccessKey: AWS_S3_CONFIG.secretAccessKey
  };

  const onCreatePost = async () => {
    if (!loading) {
      setLoading(true);
      const toastId = toast.loading('Uploading File...');
      const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
      if (!user.id) {
        toast.update(toastId, {
          type: 'error',
          render: "Can't find User Id"
        });
        setTimeout(() => toast.dismiss(), 2000);
        return;
      }

      if (isFileUploaded && file) {
        const s3 = new ReactS3Client(s3Config);
        try {
          const res = await s3.uploadFile(file);
          toast.update(toastId, {
            render: 'File Uploaded Successful',
            type: 'success',
            isLoading: false
          });
          createPost(toastId, {
            type: 'Social',
            user: user.id,
            media: res.location,
            content
          });
        } catch (exception) {
          console.log(exception);
          console.debug(exception);
          toast.update({
            render: exception.toString(),
            type: 'error'
          });
          setTimeout(() => toast.dismiss(), 2000);
        }
      } else {
        createPost(toastId, {
          type: 'Social',
          user: user.id,
          media: res.location,
          content
        });
      }

      setTimeout(() => {
        setContent('');
        setFile(null);
        setIsFileUploaded(false);
        setImage('');
        setLoading(false);
      }, 2000);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setIsFileUploaded(true);
    if (getFileType(file) == 'image') {
      setImage(URL.createObjectURL(file));
      setVideo('');
    } else if (getFileType(file) == 'video') {
      setVideo(URL.createObjectURL(file));
      setImage('');
    }
  };

  function getFileType(file) {
    if (file.type.match('image.*')) return 'image';

    if (file.type.match('video.*')) return 'video';

    if (file.type.match('audio.*')) return 'audio';

    // etc...

    return 'other';
  }

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
          {image && <img src={image} style={{ width: 300 }} className="mb-3" />}
          {video && (
            <div className="post_video" style={{ width: 300, height: 'auto !important' }}>
              <video width="300px" controls>
                <source src={video} id="video_here" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
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

            {video.length > 0 || image.length > 0 ? (
              <Button onClick={onCreatePost} variant="contained">
                Publish
              </Button>
            ) : null}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AddPost;
