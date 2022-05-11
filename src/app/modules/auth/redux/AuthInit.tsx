/* eslint-disable @typescript-eslint/no-unused-vars */

import * as actions from '../../../../setup/redux/global/Actions';
import * as auth from './AuthRedux';

import {ConnectedProps, connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {FC, useEffect, useRef, useState} from 'react';
import { getCookie, setCookie } from 'src/utils/cookies';

import {RootState} from '../../../../setup';

const mapState = (state: RootState) => ({auth: state.auth});
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  let token = getCookie('token')

  if (!token) {
    token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhOTIzNzJiNi0wODQyLTQzZWItYmM3ZS0zZjhiMmRlOGI1MjciLCJzdWIiOiJyb290LmFkbWluIiwiZW1haWwiOiJhZG1pbkByb290LmNvbSIsImlwQWRkcmVzcyI6IjE5Mi4xNjguMi4xNjkiLCJ0ZW5hbnQiOiJyb290IiwiaXNzIjoidm5kIiwiYXVkIjoidm5kIiwicm9sZXMiOiJBZG1pbiIsImV4cCI6MTY1MTM4ODQ0Nn0.oWue4Oa9j7x-kfW7rKDDc4h4I56wajfmC0GaFABQ2UU';

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
    dispatch(actions.GetUserInfo(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>
};

export default connector(AuthInit);
