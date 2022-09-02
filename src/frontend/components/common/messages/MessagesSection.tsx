import React, { useEffect, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UserListItem from 'frontend/components/messages/UserListItem';
import { useDispatch, useSelector } from 'frontend/redux/store';
import { messagesActions, searchNewUsers } from 'frontend/redux/slices/messages';
import UserListItemSkeleton from '../skeletons/UserListItemSkeleton';

const MessagesSection = (props: any) => {
  const searchedUserList = useSelector((state: any) => state.messages.searchedUserList);
  const [searchUserPayload, setSearchUserPayload] = useState<{ search: string }>({ search: '' });
  const [searchUserLoader, setSearchUserLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const users = [
    {
      id: 1,
      name: 'test',
      profile: null,
      caption: 'hello there'
    },
    {
      id: 2,
      name: 'Darshan',
      profile: null,
      caption: 'Bye'
    },
    {
      id: 3,
      name: 'Test3',
      profile: null,
      caption: 'hi'
    },
    {
      id: 4,
      name: 'Test4',
      profile: null,
      caption: 'It is test4'
    },
    {
      id: 5,
      name: 'Test5',
      profile: null,
      caption: 'It is test5'
    },
    {
      id: 6,
      name: 'Test6',
      profile: null,
      caption: 'It is test6'
    },
    {
      id: 7,
      name: 'Test7',
      profile: null,
      caption: 'It is test7'
    },
    {
      id: 8,
      name: 'Test8',
      profile: null,
      caption: 'It is test8'
    },
    {
      id: 9,
      name: 'Test9',
      profile: null,
      caption: 'It is test9'
    },
    {
      id: 10,
      name: 'Test10',
      profile: null,
      caption: 'It is test10'
    },
    {
      id: 11,
      name: 'Test11',
      profile: null,
      caption: 'It is test11'
    },
    {
      id: 12,
      name: 'Test12',
      profile: null,
      caption: 'It is test12'
    },
    {
      id: 13,
      name: 'Test13',
      profile: null,
      caption: 'It is test13'
    },
    {
      id: 11,
      name: 'Test14',
      profile: null,
      caption: 'It is test14'
    },
    {
      id: 12,
      name: 'Test15',
      profile: null,
      caption: 'It is test15'
    },
    {
      id: 13,
      name: 'Test16',
      profile: null,
      caption: 'It is test16'
    }
  ];

  useEffect(() => {
    setSearchUserLoader(true);
    dispatch(searchNewUsers(searchUserPayload)).then((res) => {
      if (res) {
        setSearchUserLoader(false);
      } else {
        setSearchUserLoader(false);
      }
    });
  }, [searchUserPayload]);

  const sxStyle = {
    width: window.innerWidth < 900 ? '100%' : 450,
    height: window.innerWidth < 900 ? '100%' : 650,
    borderRadius: window.innerWidth < 900 ? 'none' : '15px'
  };

  return (
    <Box sx={sxStyle} className="add-new-user-modal-container">
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
          {window.innerWidth < 900 ? (
            <ArrowBackIosNewIcon
              onClick={() => props.handleClose()}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <CloseIcon onClick={() => props.handleClose()} style={{ cursor: 'pointer' }} />
          )}

          <Typography id="modal-modal-title2" variant="h4">
            New Message
          </Typography>
          <Typography id="modal-modal-title3" variant="h4" mr={1}>
            Next
          </Typography>
        </Box>
        <Divider style={{ width: '100%', marginTop: '5px' }} />
        <Box
          sx={{
            overflow: 'hidden',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Typography id="modal-modal-title3" variant="h4" pt={2} pb={2} ml={1}>
            To:
          </Typography>
          <InputBase
            value={searchUserPayload.search}
            fullWidth
            style={{ marginLeft: '5px' }}
            placeholder="Search..."
            onChange={(e) => {
              setSearchUserPayload((prevState) => ({
                ...prevState,
                search: e.target.value.trim()
              }));
            }}
          />
        </Box>
        <Divider style={{ width: '100%' }} />
        <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }} variant="h4">
          Suggested
        </Typography>
      </Box>

      <Box
        ml={1}
        sx={{
          height: window.innerWidth < 900 ? '100%' : 500,
          overflowY: 'scroll',
          color: 'black',
          marginLeft: '-2px'
        }}
      >
        {searchUserLoader ? (
          <>
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
          </>
        ) : (
          searchedUserList.map((user: any) => (
            <UserListItem
              key={user.id}
              id={user.id}
              profile={user.profile_image}
              name={user.display_name || user.custom_username}
              caption={user.caption || ''}
              onClickHandler={() => {
                dispatch(messagesActions.addNewUserInChat(user));
                props.handleClose();
              }}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default MessagesSection;
