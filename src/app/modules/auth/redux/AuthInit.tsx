/* eslint-disable @typescript-eslint/no-unused-vars */

import * as actions from '../../../../setup/redux/global/Actions';
import * as auth from './AuthRedux';

import {ConnectedProps, connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {FC, useEffect, useRef, useState} from 'react';

import {RootState} from '../../../../setup';
import { getCookie } from 'src/utils/cookies';

const mapState = (state: RootState) => ({auth: state.auth});
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const dispatch = useDispatch();
  let token = getCookie('token')

  if (!token) {
    token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTA1NDA5NDUsImV4cCI6MTc0NTIzNTM0NSwidXNlciI6ImRlbW8xIiwic3ViIjoiZGVtbzEiLCJyb2xlcyI6W10sInBlcm1pc3Npb25zIjpbIkRhdGFIVC5UaHVUaGFwIiwiRGF0YUhULkR1eWV0IiwiRGF0YURWLlRodVRoYXAiXSwidXNlclBvc2l0aW9uQ29kZSI6IjgzNmY4MmFkLWMyM2UtNGE0YS05MTVjLWVkOTZjNjAwYWM5MiIsInVzZXJPZmZpY2UiOiIxOyNmNjY0NGVjMC1iZDQ3LTQzMTItOTUxNS1jODIwMzZhZWRlY2EiLCJhcmVhQ29kZSI6bnVsbH0.ry-zXbeR1yGVb4UepwhCOIwK39M9bHg6taMcwU_oGuU"';
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
