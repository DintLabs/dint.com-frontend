import { Box, List, ListItem, ListItemText, ListItemAvatar, Skeleton, useTheme } from '@mui/material';
import { Stack } from '@mui/system';

const PostItemSkeleton = () => {
    const theme = useTheme();
    return (
    <Box
      style={{
        borderBottom: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="30%" sx={{ fontSize: '1rem' }} />}
          />
          <Skeleton variant="text" width="4%" sx={{ fontSize: '1rem' }} />
        </ListItem>
      </List>
      <Box sx={{ textAlign: 'center', padding: '0 10px 0 10px' }}>
        <Skeleton variant="rectangular" height={230} />
      </Box>
      <Box sx={{ p: 2 }} className="d-flex align-items-center justify-content-between">
        <Skeleton variant="text" width="6%" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" width="4%" sx={{ fontSize: '1rem' }} />
      </Box>
    </Box>
  );
};

export default PostItemSkeleton;
