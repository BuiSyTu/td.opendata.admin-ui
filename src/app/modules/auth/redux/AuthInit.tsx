/* eslint-disable @typescript-eslint/no-unused-vars */

import * as actions from 'src/setup/redux/global/Actions';
import * as auth from './AuthRedux';

import {ConnectedProps, connect, useDispatch, useSelector} from 'react-redux';
import {FC, useEffect} from 'react';
import { getCookie, setCookie } from 'src/utils/cookies';

import {RootState} from 'src/setup';

const mapState = (state: RootState) => ({auth: state.auth});
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  let token = getCookie('token')

  if (!token) {
    token = process.env.REACT_APP_DEFAULT_TDAUTHORIZATION ?? ''
    setCookie('token', token, '/')
  }

  if (!token) {
    window.open(
      '/_layouts/closeConnection.aspx?loginasanotheruser=true',
      '_self'
    );
  }

  // We should request user by authToken before rendering the application
  useEffect(() => {
    dispatch(actions.getUserInfo(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>
};

export default connector(AuthInit);
