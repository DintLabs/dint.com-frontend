import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import eventReducer from './slices/event';
import userProfileReducer from './slices/userProfile';
import marketplaceReducer from './slices/marketplace';
import adminReducer from './slices/admin';
import newHomeReducer from './slices/newHome';
import metamaskReducer from './slices/metamask';

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
  marketplace: marketplaceReducer,
  admin: adminReducer,
  newHome: newHomeReducer,
  metamask: metamaskReducer
});

export { rootPersistConfig, rootReducer };
