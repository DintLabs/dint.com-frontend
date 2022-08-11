import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../../pages/Dashboard/httpReqHook';
import IPost from '../../types/dashboard';

interface IDashboardState {
  posts: IPost[];
  postsLoadingStatus: string;
}

const initialState: IDashboardState = {
  posts: [],
  postsLoadingStatus: 'idle'
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', () => {
  const { request } = useHttp();
  return request('https://www.getpostman.com/collections/e8f1d8a404bd17e0be11/api/posts/list/');
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsCreated: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    postsUpdate: (state, action: PayloadAction<IPost>) => {
      const {
        payload: { user, type, content }
      } = action;

      state.posts = state.posts.map((item) =>
        item.user === user ? { ...item, user, type, content } : item
      );
    },
    postsDeleted: (state, action: PayloadAction<{ user: number }>) => {
      state.posts = state.posts.filter((item: { user: any }) => item.user !== action.payload);
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchPosts.pending, (initialState: { postsLoadingStatus: string }) => {
        initialState.postsLoadingStatus = 'loading';
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          initialState: { postsLoadingStatus: string; posts: IPost },
          action: PayloadAction<IPost>
        ) => {
          initialState.postsLoadingStatus = 'idle';
          initialState.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (initialState: { postsLoadingStatus: string }) => {
        initialState.postsLoadingStatus = 'error';
      });
  }
});

export default postsSlice.reducer;
export const { postsCreated, postsUpdate, postsDeleted } = postsSlice.actions;
