import { Chip, IconButton, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const Subscriptions = () => {
  const theme = useTheme();
  return (
    <Stack
      className="subscriptions-container"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      {/* main header */}
      <Stack
        direction="row"
        alignItems="center"
        className="container-header"
        spacing={2}
        sx={{ p: { xs: 1, md: 1, xl: 1 } }}
      >
        <IconButton className="primary-text-color" size="small">
          <AiOutlineArrowLeft className="primary-text-color" />
        </IconButton>
        <Typography
          className="primary-text-color"
          textTransform="uppercase"
          variant="subtitle1"
          sx={{ pt: 0.25 }}
        >
          Following
        </Typography>
      </Stack>

      {/* Status and search header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: { xs: 1.5, md: 1.5, xl: 1.5 } }}
      >
        <Typography className="secondary-text-color" textTransform="uppercase" variant="body2">
          Expired
        </Typography>
        <IconButton size="small">
          <BsSearch className="primary-text-color cursor-pointer" />
        </IconButton>
      </Stack>

      {/* filter chips header */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ px: { xs: 1.5, md: 1.5, xl: 1.5 }, pb: 1 }}
      >
        <Chip label="All 0" clickable className="inactive-chip-color" />
        <Chip label="Active 0" clickable className="inactive-chip-color" />
        <Chip label="Expired 0" clickable className="active-chip-color" />
        {/* <Chip label="Attention required 0" clickable className="inactive-chip-color" /> */}
      </Stack>
      {/* body section */}
      <Stack justifyContent="center" alignItems="center" sx={{ pt: 18 }}>
        Nothing found
      </Stack>
    </Stack>
  );
};

export default Subscriptions;
