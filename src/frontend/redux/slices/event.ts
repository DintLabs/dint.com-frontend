import { createSlice } from '@reduxjs/toolkit';

type IEventState = {
  isLoading: boolean;
  error: any;
};

const initialState: IEventState = {
  isLoading: false,
  error: false
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
