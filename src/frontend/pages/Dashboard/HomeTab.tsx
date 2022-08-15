import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Input, Stack, Typography, useTheme, Button } from '@mui/material';
import './navbarTab.css';
import { useState } from 'react';
import { useSelector, RootState } from 'frontend/redux/store';
import ReactS3Client from 'react-aws-s3-typescript';
import PostItem from './PostItem';
import { AWS_S3_CONFIG } from '../../config';

interface Props {
  widthScreen: number;
  onHandle: (text: string) => void;
  onDelete: (post: number) => void;
  onCreatePost: () => void;
}

const HomeTab = ({ widthScreen, onHandle, onDelete, onCreatePost }: Props) => {
  const theme = useTheme();
  const [content, setContent] = useState<string>('');
  const { posts } = useSelector((rootState: RootState) => rootState.dashboard);
  const [file, setFile] = useState<any>({});
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const s3Config = {
    bucketName: 'dint',
    region: 'us-east-2',
    accessKeyId: AWS_S3_CONFIG.accessKeyId,
    secretAccessKey: AWS_S3_CONFIG.secretAccessKey
  };

  const handleNewPost = async () => {
    console.log(isFileUploaded);
    if (isFileUploaded) {
      const s3 = new ReactS3Client(s3Config);
      try {
        const res = await s3.uploadFile(file);
        onCreatePost();
        //  call post API here
      } catch (exception) {
        console.debug(exception);
        /* handle the exception */
      }
    } else {
      //  call post API in else part
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    setIsFileUploaded(true);
  };

  const onHandleChange = (e: any) => {
    setContent(e.target.value);
    onHandle(content);
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
        <Box
          style={{
            borderBottom: `1px solid ${theme.palette.grey[700]}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          sx={{ p: 2 }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            HOME
          </Typography>
          <Button onClick={handleNewPost}>Post</Button>
        </Box>

        <Box sx={{ p: 1, borderBottom: `8px solid ${theme.palette.grey[700]}` }}>
          <Input
            multiline
            rows={4}
            disableUnderline={true}
            fullWidth
            value={content}
            onChange={onHandleChange}
            placeholder="Compose new post..."
          />
          <Stack direction="row">
            <input
              type="file"
              name="file"
              onChange={(e) => handleFileChange(e)}
              accept="image/* , video/mp4,video/x-m4v,video/*"
            />
            <IconButton>
              <ImageIcon />
            </IconButton>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Stack>
        </Box>
        {posts.map(({ id, content, user }: any) => (
          <PostItem
            key={id}
            description={content}
            userName={user.first_name}
            onDelete={() => onDelete(id)}
          />
        ))}
      </Box>
    </>
  );
};

export default HomeTab;
