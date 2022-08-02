import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import eventReducer from './slices/event';
import userProfileReducer from './slices/userProfile';
import marketplaceReducer from './slices/marketplace';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  event: eventReducer,
  userProfile: userProfileReducer,
  marketplace: marketplaceReducer
});

export { rootPersistConfig, rootReducer };
