import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import userReducer from '../store/slices/userSlice';

// Configure the Redux store with our reducers
export const store = configureStore({
  reducer: {
    accountReducer,
    user: userReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;