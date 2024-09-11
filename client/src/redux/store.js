import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

import userReducer from '../redux/userredux'; 


const rootReducer = combineReducers({
  user: userReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);
