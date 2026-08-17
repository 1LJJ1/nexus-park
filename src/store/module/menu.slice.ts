import { createSlice } from '@reduxjs/toolkit';
export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu: localStorage.getItem('nexus-menu') || [],
  },
  reducers: {
    setMenu(state, actions) {
      state.menu = actions.payload;
      localStorage.setItem('nexus-menu', JSON.stringify(actions.payload));
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
