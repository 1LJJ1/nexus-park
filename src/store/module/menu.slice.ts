import { createSlice } from '@reduxjs/toolkit';
import type { MenuItemResp } from '@/api/login/login.api';
const storedMenu = localStorage.getItem('nexus-menu');
interface InitialState {
  menu: MenuItemResp[];
}
const initialState: InitialState = {
  menu: storedMenu ? JSON.parse(storedMenu) : [], // 直接解析为数组
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu(state, actions) {
      state.menu = actions.payload;
      localStorage.setItem('nexus-menu', JSON.stringify(actions.payload));
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
