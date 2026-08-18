import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('nexus-token') || '',
    userInfo: localStorage.getItem('nexus-userInfo') || '',
  },
  reducers: {
    setToken(state, actions) {
      state.token = actions.payload;
      localStorage.setItem('nexus-token', actions.payload);
    },
    setUserInfo(state, actions) {
      state.userInfo = actions.payload;
      localStorage.setItem('nexus-userInfo', actions.payload);
    },
  },
});

export const { setToken, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
