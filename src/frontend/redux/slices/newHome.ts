import { createSlice } from '@reduxjs/toolkit';

type NewHomeState = {
  selectedMenu: HOME_SIDE_MENU;
  isLoading: boolean;
};

export enum HOME_SIDE_MENU {
  HOME = 'HOME',
  MESSAGES = 'MESSAGES',
  MY_PROFILE = 'MY_PROFILE',
  ADD_POST = 'ADD_POST'
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
