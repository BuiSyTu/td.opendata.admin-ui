import {globalSlice} from './Slice';
import { sharepointApi } from 'src/app/apis';

const {actions} = globalSlice;
const { setUserInfo, logOut: lgOut } = actions;

export const getUserInfo = (accessToken) => async(dispatch) => {
  // TODO: 
  const userInfo = await sharepointApi.getUserInfo(accessToken)
  dispatch(setUserInfo(userInfo))
};

export const logOut = () => (dispatch) => {
  dispatch(lgOut())
}

