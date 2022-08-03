import { createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { databaseInstance } from 'frontend/contexts/FirebaseInstance';
import { IEvent, IVenue } from 'frontend/types/event';
import { dispatch } from '../store';

type IAdminState = {
  isLoading: boolean;
  isVenueLoading: boolean;
  lstEvent: IEvent[];
  lstVanue: IVenue[];
  error: any;
};

const initialState: IAdminState = {
  isLoading: false,
  isVenueLoading: false,
  lstEvent: [],
  lstVanue: [],
  error: false
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    startVanueLoading(state) {
      state.isVenueLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
      state.isVenueLoading = false;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.isVenueLoading = false;
      state.error = action.payload;
    },
    setAdminSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;
export const { setAdminSliceChanges } = slice.actions;

export function fetchAdminEvents() {
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
        dispatch(slice.actions.setAdminSliceChanges({ lstEvent: eventarray, isLoading: false }));
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function fetchVanues() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startVanueLoading());
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `venues/`));

      if (snapshot.exists()) {
        const vanues = Object.keys(snapshot.val());
        const lstVanues: any = [];
        for (let j = 0; j < vanues.length; j++) {
          lstVanues.push(snapshot.val()[vanues[j]]);
        }
        console.log(lstVanues);
        dispatch(
          slice.actions.setAdminSliceChanges({ lstVanue: lstVanues, isVenueLoading: false })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function updateAdminEvent(IO: IEvent) {
  try {
    dispatch(slice.actions.startLoading());
    await update(ref(databaseInstance, `events/${IO.eventName}`), { ...IO });
  } catch (error) {
    console.log(error);
    alert(`error in update${error}`);
    dispatch(slice.actions.hasError(error));
  }
}

export async function crateEvent(IO: IEvent) {
  try {
    dispatch(slice.actions.startLoading());
    await set(ref(databaseInstance, `events/${IO.eventName}`), { ...IO });
  } catch (error) {
    console.log(error);
    alert(`error in event save ${error}`);
    dispatch(slice.actions.hasError(error));
  }
}

export async function createVenue(IO: IVenue) {
  try {
    dispatch(slice.actions.startVanueLoading());
    await set(ref(databaseInstance, `venues/${IO.venueName}`), IO);
  } catch (error) {
    console.log(error);
    alert('Error in Vanue Save');
    dispatch(slice.actions.hasError(error));
  }
}
