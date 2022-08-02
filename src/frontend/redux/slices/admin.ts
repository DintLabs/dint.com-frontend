import { createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { databaseInstance } from 'frontend/contexts/FirebaseInstance';
import { IEvent, IVanue } from 'frontend/types/event';
import { dispatch } from '../store';

type IAdminState = {
  isLoading: boolean;
  isVenueLoading: boolean;
  lstEvent: IEvent[];
  lstVanue: IVanue[];
  tokenName: string;
  selectedEventNameForFirebase: string;
  error: any;
  addEventForm: {
    network: number;
    tokenIcon: string;
    tokenSymbol: string;
    tokenDecimal: string;
    token_type: string;
  };
  editEventForm: {
    network: number;
    tokenIcon: string;
    token_type: string;
    tokenSymbol: string;
    tokenDecimal: string;
  };
};

const initialState: IAdminState = {
  isLoading: false,
  isVenueLoading: false,
  addEventForm: {
    network: 1,
    tokenIcon: '',
    tokenDecimal: '',
    tokenSymbol: '',
    token_type: ''
  },
  editEventForm: {
    network: 1,
    tokenIcon: '',
    token_type: '',
    tokenDecimal: '',
    tokenSymbol: ''
  },

  tokenName: '',
  selectedEventNameForFirebase: '',
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
