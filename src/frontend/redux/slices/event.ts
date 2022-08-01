import { createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, ref } from 'firebase/database';
import { IEvent } from 'frontend/types/event';
import { RootState } from '../store';

type IEventState = {
  isLoading: boolean;
  lstEvent: IEvent[];
  selectedEvent?: IEvent;
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
  return async (dispatch: any, getState: () => RootState) => {
    try {
      console.log('Data');
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `events/`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const events = Object.keys(snapshot.val());
        const eventarray: any = [];
        for (let i = 0; i < events.length; i++) {
          eventarray.push(snapshot.val()[events[i]]);
        }
        dispatch(slice.actions.setSliceChanges({ lstEvent: eventarray }));
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function onSelectEvent(objEvent: IEvent) {
  return async (dispatch: any) => {
    dispatch(slice.actions.setSliceChanges({ selectedEvent: objEvent }));
  };
}
