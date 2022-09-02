import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Stack } from '@mui/system';
import ChatSection from 'frontend/components/messages/ChatSection';
import UserListItem from 'frontend/components/messages/UserListItem';
import { useDispatch } from 'frontend/redux/store';
import React, { useEffect, useState } from 'react';

import {
  BsSearch,
  BsPlusLg,
  BsFilterLeft,
  BsFillPencilFill,
  BsChatLeftTextFill
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router';
import NewMessage from 'frontend/components/messages/NewMessage';
import UserListItemSkeleton from 'frontend/components/common/skeletons/UserListItemSkeleton';
import { fetchAllChatsList } from '../../redux/slices/messages';

interface Props {
  widthScreen: number;
}
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
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 5,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 6,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 7,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 8,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 9,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 10,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 11,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 12,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 13,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 14,
    name: 'test',
    profile: null,
    caption: 'hello there'
  },
  {
    id: 15,
    name: 'Darshan',
    profile: null,
    caption: 'Bye'
  },
  {
    id: 16,
    name: 'Test3',
    profile: null,
    caption: 'hi'
  },
  {
    id: 17,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 18,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 19,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 20,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 21,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 22,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 23,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 24,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 25,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  },
  {
    id: 26,
    name: 'Test2',
    profile: null,
    caption: 'See you soon'
  }
];

const Messages = ({ widthScreen }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();
  const allChatsList = useSelector((state: any) => state.messages.chatList);
  const [selectedUser, setSelectedUser] = useState({ id: -1 });
  const [renderUsers, setRenderUsers] = useState<any>([]);

  const [isAddNewModalOpen, setIsAddNewModalOpen] = React.useState(false);
  const [chatListLoader, setChatListLoader] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>();

  //  User search related states
  const [isUserSearchOpen, setIsUserSearchOpen] = useState<boolean>(false);
  const [userSearchText, setUserSearchText] = useState<string>('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (typeof userData === 'string') {
      setLoggedInUser(JSON.parse(userData));
    }
  }, [localStorage.getItem('userData')]);

  const handleModalOpen = () => {
    setIsAddNewModalOpen(true);
    navigate('/lounge/messages/newMessage');
  };
  const handleModalClose = () => {
    setIsAddNewModalOpen(false);
    navigate('/lounge/messages');
  };

  // fetching all the chats for logged in user
  useEffect(() => {
    const allChatInterval = setInterval(() => {
      console.log('allChatInterval called ===>');
      dispatch(fetchAllChatsList()).then((res) => {
        if (res) {
          setChatListLoader(false);
        } else {
          setChatListLoader(false);
        }
      });
    }, 2000000);

    dispatch(fetchAllChatsList()).then((res) => {
      if (res) {
        setChatListLoader(false);
      } else {
        setChatListLoader(false);
      }
    });

    return () => {
      clearInterval(allChatInterval);
    };
  }, []);

  useEffect(() => {
    const selectedUserData = allChatsList.find((user: any) => user.id === +params.uid);
    if (params.uid && selectedUserData) {
      setSelectedUser(selectedUserData);
    }
  }, [params.uid, allChatsList]);

  useEffect(() => {
    fetchNext();
  }, []);

  // to auto focus user serach field
  useEffect(() => {
    if (isUserSearchOpen) {
      document.getElementById('user-search-input')?.focus();
    }
  }, [isUserSearchOpen]);

  const fetchNext = () => {
    console.log('fetch post calls');

    setTimeout(() => {
      setRenderUsers(renderUsers.concat(users.slice(renderUsers.length, renderUsers.length + 10)));
    }, 3000);
  };

  const handleUserSearchOpen = () => {
    setIsUserSearchOpen(true);
  };

  const handleUserSearchClose = () => {
    setIsUserSearchOpen(false);
  };

  const handleClickAwayListener = () => {
    if (userSearchText.trim().length === 0) {
      handleUserSearchClose();
    }
  };

  return (
    <>
      <Stack
        direction="row"
        className="messages-container"
        style={{
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`
        }}
      >
        {/* users list */}
        <Box
          className="user-list"
          sx={
            window.innerWidth < 900
              ? params.uid
                ? { width: 0 }
                : { width: '100%' }
              : { width: '40%' }
          }
        >
          {/* messsage header */}
          <ClickAwayListener onClickAway={handleClickAwayListener}>
            <Stack
              className="message-header"
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}
              component="div"
            >
              {isUserSearchOpen ? (
                <TextField
                  id="user-search-input"
                  value={userSearchText}
                  onChange={(e) => {
                    setUserSearchText(e.target.value);
                  }}
                  fullWidth
                  size="small"
                  sx={{
                    '& legend': { display: 'none' },
                    '& fieldset': { top: 0 }
                  }}
                />
              ) : (
                <Typography className="primary-text-color capitalize-text" variant="subtitle1">
                  Messages
                </Typography>
              )}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small" onClick={handleUserSearchOpen}>
                  <BsSearch className="primary-text-color cursor-pointer" />
                </IconButton>
                <IconButton size="small" onClick={handleModalOpen}>
                  <BsPlusLg className="primary-text-color cursor-pointer" />
                </IconButton>
                {isAddNewModalOpen && (
                  <NewMessage open={isAddNewModalOpen} handleClose={handleModalClose} />
                )}
              </Stack>
            </Stack>
          </ClickAwayListener>
          <Divider />
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: { xs: 0.5, md: 1, xl: 2 } }}
          >
            <Typography variant="body2" className="secondary-text-color capitalize-text">
              Recent
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton size="small">
                <BsFilterLeft className="secondary-text-color cursor-pointer" fontSize={22} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ px: { xs: 0.5, md: 1, xl: 2 }, pb: 1 }}
          >
            <Chip label="All" clickable className="active-chip-color" />
            <Chip label="Following" clickable className="inactive-chip-color" />
            <Chip label={<BsFillPencilFill />} clickable className="clickable-chip-color" />
          </Stack>
          {/* list of users */}

          {/* <Box className="users" id="usersListScrollableDiv">
            <Stack direction="column" height="100%">
              <InfiniteScroll
                dataLength={renderUsers.length}
                next={fetchNext}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="usersListScrollableDiv"
              >
                {renderUsers.map((user: any) => (
                  <UserListItem
                    isSelected={user.id === selectedUser}
                    key={user.id}
                    id={user.id}
                    profile={user.profile}
                    name={user.name}
                    caption={user.caption}
                  />
                ))}
              </InfiniteScroll>
            </Stack>
          </Box> */}

          {chatListLoader ? (
            <>
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
              <UserListItemSkeleton />
            </>
          ) : allChatsList.length === 0 ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 5 }}
              className="secondary-text-color"
            >
              Please add new user
            </Stack>
          ) : (
            <Box className="users">
              <Stack direction="column">
                {allChatsList.map((user: any) => (
                  <UserListItem
                    isSelected={selectedUser.id === user.id}
                    key={user.id}
                    id={user.id}
                    profile={user.profile_image}
                    name={user.display_name || user.custom_username}
                    caption={user?.latest_message?.content || ''}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        {/* chat section */}
        <ChatSection selectedUser={selectedUser} loggedInUser={loggedInUser} />
      </Stack>
    </>
  );
};

export default Messages;
