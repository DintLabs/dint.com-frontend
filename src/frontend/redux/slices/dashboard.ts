import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/httpReqHook';
import IPost from '../../types/dashboard';
import { RequestMethods } from '../../types/request';
import IGetPost from '../../types/getPost';

interface IDashboardState {
  posts: IGetPost[];
  postsLoadingStatus: string;
}

const initialState: IDashboardState = {
  posts: [],
  postsLoadingStatus: 'idle'
};

export const fetchPost = createAsyncThunk('posts/fetchPost', (post: number) => {
  const { request } = useHttp();
  return request(`http://18.204.217.87:8000/api/posts/get/${post}/`);
});

export const likePost = createAsyncThunk('posts/likePost', () => {
  const { request } = useHttp();
  return request('http://18.204.217.87:8000/api/posts/like/', RequestMethods.POST);
});

export const commentPost = createAsyncThunk('posts/commentPost', () => {
  const { request } = useHttp();
  return request('http://18.204.217.87:8000/api/posts/comment/', RequestMethods.POST);
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
    }
  }
});

export default postsSlice.reducer;
export const { fetchPosts, postsCreated, postsUpdate, postsDeleted } = postsSlice.actions;
