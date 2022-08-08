import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const Messages = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`,
          height: '95vh'
        }}
      >
        <Box sx={{ pt: 10 }}>
          <Typography variant="h2" sx={{ textAlign: 'center', color: 'text.primary' }}>
            Under contrsution
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Messages;
