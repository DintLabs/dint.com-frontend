import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

type MessageItemProps = {
  messageId: number;
  message: string;
  isSender: boolean;
  time: string;
};

function MessageItem(props: MessageItemProps) {
  const [difference, setDifference] = useState(0);
  return (
    <>
      <Box
        className={`message-item ${
          props.isSender ? 'justify-content-end sender-message' : 'receiver-message'
        }`}
        key={props.messageId}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          className="message-container"
        >
          <Box className="message">
            <Typography>{props.message}</Typography>
            {/* <Box className="message-time"> */}
            <Typography variant="caption" className="message-time">
              {props.time}
            </Typography>
            {/* </Box> */}
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default MessageItem;
