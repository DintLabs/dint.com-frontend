import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import eventReducer from './slices/event';
import userProfileReducer from './slices/userProfile';
import marketplaceReducer from './slices/marketplace';
import adminReducer from './slices/admin';
import newHomeReducer from './slices/newHome';
import metamaskReducer from './slices/metamask';
import messagesReducer from './slices/messages';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const reducers = combineReducers({
  event: eventReducer,
  userProfile: userProfileReducer,
  marketplace: marketplaceReducer,
  admin: adminReducer,
  newHome: newHomeReducer,
  metamask: metamaskReducer,
  messages: messagesReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') state = { ...state, messages: undefined };

  return reducers(state, action);
};

export { rootPersistConfig, rootReducer };
