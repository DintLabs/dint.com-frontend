import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import eventReducer from './slices/event';
import userProfileReducer from './slices/userProfile';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  event: eventReducer,
  userProfile: userProfileReducer
});

export { rootPersistConfig, rootReducer };
