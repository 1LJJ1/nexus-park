import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/user.slice';
import menuReducer from './module/menu.slice';
export const store = configureStore({
  reducer: { userReducer, menuReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
