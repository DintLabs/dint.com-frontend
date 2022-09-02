import { createSlice } from '@reduxjs/toolkit';

type NewHomeState = {
  selectedMenu: HOME_SIDE_MENU;
  isLoading: boolean;
};

export enum HOME_SIDE_MENU {
  LOUNGE = 'lounge',
  HOME = 'home',
  MESSAGES = 'messages',
  MY_PROFILE = 'profile',
  MY_EVENT = 'event',
  ADD_POST = 'add-post',
  SUBSCRIPTIONS = 'subscriptions'
}

const initialState: NewHomeState = {
  selectedMenu: HOME_SIDE_MENU.HOME,
  isLoading: false
};

const slice = createSlice({
  name: 'newHome',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setNewHomeSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
export const { setNewHomeSliceChanges } = slice.actions;
