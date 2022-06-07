import { globalSlice } from './Slice';
import { sharepointApi } from 'src/app/apis';

const { actions } = globalSlice;
const { setUserInfo, logOut: lgOut } = actions;

export const getUserInfo = (accessToken: string) => async (dispatch: any) => {
  // TODO: 
  const response = await sharepointApi.getUserInfo(accessToken)
  dispatch(setUserInfo(response?.data ?? null))
};

export const logOut = () => (dispatch: any) => {
  dispatch(lgOut())
}

