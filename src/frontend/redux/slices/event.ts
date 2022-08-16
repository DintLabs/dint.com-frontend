import { createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, ref } from 'firebase/database';
import { IEvent } from 'frontend/types/event';

type IEventState = {
  isLoading: boolean;
  lstEvent: IEvent[];
  error: any;
};

const initialState: IEventState = {
  isLoading: false,
  lstEvent: [],
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

export function fetchEvents() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `events/`));
      if (snapshot.exists()) {
        const events = Object.keys(snapshot.val());
        const eventarray: any = [];
        for (let i = 0; i < events.length; i++) {
          eventarray.push(snapshot.val()[events[i]]);
        }
        dispatch(slice.actions.setSliceChanges({ lstEvent: eventarray, isLoading: false }));
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
