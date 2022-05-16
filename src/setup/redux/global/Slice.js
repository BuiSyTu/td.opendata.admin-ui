import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  accessTokenOld: '',
  refreshToken: '',
  userInfo: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state, action) => {
      state = initialState;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
