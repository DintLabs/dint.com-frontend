import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Input, Stack, Typography, useTheme } from '@mui/material';
import './navbarTab.css';
import PostItem from './PostItem';

const HomeTab = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`
        }}
        sx={{ height: '90vh', overflowY: 'scroll' }}
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

        <PostItem
          description="In real life with angia and maria.In real life with angia and maria.In real life with angia and maria.In real life with angia and maria"
          userName="Dint"
        />
        <PostItem
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          userName="Dint"
        />
        <PostItem
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
          userName="Dint"
        />
      </Box>
    </>
  );
};

export default HomeTab;
