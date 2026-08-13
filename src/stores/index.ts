import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/user.slice';
export const store = configureStore({
  reducer: { userReducer },
});
