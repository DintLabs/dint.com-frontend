import { Box, Divider, Typography } from '@mui/material';
import { getLocalTime } from 'frontend/utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageItem from './MessageItem';

type MessageListProp = {
  messages: { id: number; reciever: any; sender: any; content: string; created_at: any }[];
  loggedInUser: any;
};

function MessageList(props: MessageListProp) {
  const [renderMesssages, setRenderMessages] = useState<any>([]);

  console.log(getLocalTime(props.messages.created_at).format('hh:mm a'));

  useEffect(() => {
    fetchMessages();
  }, [props.messages]);

  const fetchMessages = () => {
    console.log('new messages fetched');
    setTimeout(() => {
      setRenderMessages(
        renderMesssages.concat(
          props.messages.slice(renderMesssages.length, renderMesssages.length + 8)
        )
      );
    }, 500);
  };

  return (
    <Box
      className="message-list"
      sx={{ height: window.innerWidth >= 900 ? '100%' : 'full', overflowY: 'scroll' }}
    >
      {/* <div
        id="messageListScrollabelDiv"
        style={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse'
        }}
      >
        <InfiniteScroll
          dataLength={renderMesssages.length}
          next={fetchMessages}
          hasMore={renderMesssages.length !== props.messages.length}
          loader={<h4>Loading...</h4>}
          scrollableTarget="messageListScrollabelDiv"
          inverse={true}
          style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }}
        >
          {renderMesssages.map((message: any) => {
            if (message.isSender) {
              return (
                <MessageItem
                  key={message.id}
                  message={message.message}
                  messageId={message.id}
                  isSender={message.isSender}
                />
              );
            }
            return (
              <MessageItem
                key={message.id}
                message={message.message}
                messageId={message.id}
                isSender={message.isSender}
              />
            );
          })}
        </InfiniteScroll>
      </div> */}

      <div
        id="messageListScrollabelDiv"
        style={{
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse'
        }}
      >
        {props.messages.map((message, index) => {
          return (
            <>
              {/* {console.log(
                message.id,
                props.messages[index + 1].id,
                moment.duration(
                  getLocalTime(message.created_at).diff(getLocalTime(props.messages[index + 1]))
                )
              )} */}
              {/* <Divider className="message-list-divider secondary-text-color">
                <Typography>Text</Typography>
              </Divider> */}
              <MessageItem
                key={message.id}
                message={message.content}
                messageId={message.id}
                isSender={props.loggedInUser.id === message.sender.id}
                time={getLocalTime(message.created_at).format('hh:mm a')}
              />
            </>
          );
        })}
      </div>
    </Box>
  );
}

export default MessageList;
