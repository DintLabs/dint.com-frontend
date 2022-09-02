import { Avatar, Divider, IconButton, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router';
import { AiOutlineLeft } from 'react-icons/ai';
import { fetchMessageList, sendMessage } from 'frontend/redux/slices/messages';
import { useDispatch, useSelector } from 'frontend/redux/store';
import { cloneDeep } from 'lodash';
import MessageList from './MessageList';

const messages = [
  { id: 1, message: 'hi there', isSender: true },
  { id: 2, message: 'hi there', isSender: false },
  { id: 3, message: 'afafdadfadf ', isSender: true },
  { id: 4, message: 'hi there', isSender: true },
  { id: 5, message: 'hi there', isSender: false },
  { id: 6, message: 'afafdadfadf ', isSender: true },
  { id: 7, message: 'hi there', isSender: true },
  { id: 8, message: 'hi there', isSender: false },
  { id: 9, message: 'afafdadfadf ', isSender: true },
  { id: 10, message: 'hi there', isSender: true },
  { id: 11, message: 'hi there', isSender: false },
  { id: 12, message: 'afafdadfadf ', isSender: true },
  { id: 13, message: 'hi there', isSender: true },
  { id: 14, message: 'hi there', isSender: false },
  { id: 15, message: 'afafdadfadf ', isSender: true },
  { id: 16, message: 'hi there', isSender: true },
  { id: 17, message: 'hi there', isSender: false },
  { id: 18, message: 'afafdadfadf ', isSender: true }
];

type ChatSectionProps = {
  selectedUser: any;
  loggedInUser: any;
};

function ChatSection(props: ChatSectionProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messagesList = useSelector((state) => state.messages.messagesList);
  const [messageListLoader, setMessageListLoader] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const sendMessageHandler = () => {
    if (messageContent.trim().length > 0 && props.selectedUser.id !== -1 && props.loggedInUser.id) {
      dispatch(
        sendMessage({
          reciever: props.selectedUser.id.toString(),
          sender: props.loggedInUser.id.toString(),
          content: messageContent.trim()
        })
      );
    }
    setMessageContent('');
  };

  useEffect(() => {
    if (props.selectedUser.id !== -1) {
      setMessageListLoader(true);
      dispatch(fetchMessageList(props.selectedUser.id)).then((res) => {
        if (res) {
          setMessageListLoader(false);
        } else {
          setMessageListLoader(false);
        }
      });
    }
  }, [props.selectedUser]);

  return props?.selectedUser?.id !== -1 ? (
    <Box
      className="chat-section chat-container"
      sx={
        window.innerWidth < 900 ? (params.uid ? { width: '100%' } : { width: 0 }) : { width: '60%' }
      }
    >
      {/* Header */}
      <Stack
        className="chat-header"
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {window.innerWidth < 900 ? (
            <AiOutlineLeft
              className="primary-text-color"
              onClick={() => {
                navigate('/lounge/messages');
              }}
            />
          ) : null}
          <Avatar src={props.selectedUser?.profile_image} />
          <Stack direction="column">
            <Typography className="primary-text-color">
              {props.selectedUser?.display_name || props.selectedUser?.custom_username}
            </Typography>
            <Typography variant="caption" className="secondary-text-color">
              {/* online */}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton size="small">
            <FiMoreVertical className="primary-text-color cursor-pointer" />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
      {/* Message list */}

      <MessageList messages={messagesList} loggedInUser={props.loggedInUser} />

      {/* footer */}

      <Stack direction="row" className="message-input" sx={{ p: { xs: 1, md: 1, xl: 1 } }}>
        <TextField
          value={messageContent}
          fullWidth
          size="small"
          placeholder="Enter message..."
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              sendMessageHandler();
            }
          }}
          sx={{
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 }
          }}
        />
        <IconButton onClick={sendMessageHandler}>
          <MdSend />
        </IconButton>
      </Stack>
    </Box>
  ) : window.innerWidth > 900 ? (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="chat-section"
      spacing={2}
      width="60%"
    >
      <BsChatLeftTextFill fontSize={50} />
      <Typography className="secondary-text-color">Select a user to chat</Typography>
    </Stack>
  ) : null;
}

export default ChatSection;
