import { createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
  accessToken?: string,
  accessTokenOld?: string,
  refreshToken?: string,
  userInfo?: any,
  firstAccess?: boolean,
}

const initialState = {
  accessToken: '',
  accessTokenOld: '',
  refreshToken: '',
  userInfo: null,
  firstAccess: true,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    logOut: (state: any, action: any) => {
      state = initialState;
    },
    setAccessToken: (state: any, action: any) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state: any, action: any) => {
      state.userInfo = action.payload;
    },
    setFirstAccess: (state: any, action: any) => {
      state.firstAccess = action.payload;
    }
  },
});

const { actions, reducer } = globalSlice
export const {
  logOut,
  setAccessToken,
  setUserInfo,
  setFirstAccess,
} = actions
export default reducer
