import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Input, Stack, Typography, useTheme } from '@mui/material';
import './navbarTab.css';
import { useState } from 'react';
import { useSelector, RootState } from 'frontend/redux/store';
import PostItem from './PostItem';

interface Props {
  widthScreen: number;
  onHandle: (text: string) => void;
  onDelete: (post: number) => void;
}

const HomeTab = ({ widthScreen, onHandle, onDelete }: Props) => {
  const theme = useTheme();
  const [content, setContent] = useState<string>('');
  const { posts } = useSelector((rootState: RootState) => rootState.dashboard);

  const onHandleChange = (e: any) => {
    setContent(e.target.value);
    onHandle(content);
  };

  console.log(posts, 'fff');

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
            borderBottom: `1px solid ${theme.palette.grey[700]}`
          }}
          sx={{ p: 2 }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary' }}>
            HOME
          </Typography>
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
            <IconButton>
              <ImageIcon />
            </IconButton>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Stack>
        </Box>
        {posts.map(({ user, content }) => (
          <PostItem
            key={user}
            description={content}
            userName={user}
            onDelete={() => onDelete(user)}
          />
        ))}
      </Box>
    </>
  );
};

export default HomeTab;
