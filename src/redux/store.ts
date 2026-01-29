import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cartReducer from './cartSlice';
import productReducer from './productSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'products'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
