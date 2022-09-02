// @ts-nocheck
/* eslint-disable */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/httpReqHook';
import IPost from '../../types/lounge';
import { RequestMethods } from '../../types/request';
import IGetPost from '../../types/getPost';

interface ILoungeState {
  posts: IGetPost[];
  postsLoadingStatus: string;
}

const initialState: ILoungeState = {
  posts: [],
  textPosts: [],
  photoPosts: [],
  videoPosts: [],
  postsLoadingStatus: 'idle'
};

export const fetchPost = createAsyncThunk('posts/fetchPost', (post: number) => {
  const { request } = useHttp();
  return request(`http://api.dint.com//api/posts/get/${post}/`);
});

export const likePost = createAsyncThunk('posts/likePost', () => {
  const { request } = useHttp();
  return request('http://api.dint.com//api/posts/like/', RequestMethods.POST);
});

export const commentPost = createAsyncThunk('posts/commentPost', () => {
  const { request } = useHttp();
  return request('http://api.dint.com//api/posts/comment/', RequestMethods.POST);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state, action: PayloadAction<{ data: IGetPost[] }>) => {
      state.posts = action.payload.data;
      state.postsLoadingStatus = 'idle';
    },
    postsCreated: (state, action: PayloadAction<IGetPost>) => {
      state.posts.unshift(action.payload);
    },
    postsUpdate: (state, action: PayloadAction<IPost>) => {
      const {
        payload: { user, type, content }
      } = action;

      state.posts = state.posts.map((item) =>
        item.user === user ? { ...item, user, type, content } : item
      );
    },
    postsDeleted: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((item: IGetPost) => item.id !== action.payload);
    },
    addNewPost: (state, action) => {
      if (action.payload.type === 'text' && state.textPosts.length) {
        state.textPosts = [action.payload, ...state.textPosts];
      }
      if (action.payload.type === 'image' && state.photoPosts.length) {
        state.textPosts = [action.payload, ...state.textPosts];
      }
      if (action.payload.type === 'video' && state.videoPosts.length) {
        state.textPosts = [action.payload, ...state.videoPosts];
      }
      if (state.posts.length) {
        state.posts = [action.payload, ...state.posts];
      }
    },
    setLoungeSliceChanges: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export default postsSlice.reducer;
export const { fetchPosts, postsCreated, postsUpdate, postsDeleted } = postsSlice.actions;
