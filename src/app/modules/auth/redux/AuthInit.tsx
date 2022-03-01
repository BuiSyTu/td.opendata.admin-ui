import {FC, useRef, useEffect, useState} from 'react';
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux';
import {LayoutSplashScreen} from '../../../../_metronic/layout/core';
import * as auth from './AuthRedux';
import {getUserByToken} from './AuthCRUD';
import {RootState} from '../../../../setup';

const mapState = (state: RootState) => ({auth: state.auth});
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDYxMjMxNTYsImV4cCI6MTc0MDgxNzU1NiwidXNlciI6ImRlbW8xIiwic3ViIjoiZGVtbzEiLCJyb2xlcyI6W10sInBlcm1pc3Npb25zIjpbIkRhdGFIVC5UaHVUaGFwIiwiRGF0YUhULkR1eWV0IiwiRGF0YURWLlRodVRoYXAiXSwidXNlclBvc2l0aW9uQ29kZSI6IjgzNmY4MmFkLWMyM2UtNGE0YS05MTVjLWVkOTZjNjAwYWM5MiIsInVzZXJPZmZpY2UiOiIxOyNmNjY0NGVjMC1iZDQ3LTQzMTItOTUxNS1jODIwMzZhZWRlY2EiLCJhcmVhQ29kZSI6bnVsbH0.nlnYtSg_OWfxpyQrjMyp6UopYPv1JXGLM4Ao8W7-2vQ'
  // useSelector<RootState>(({auth}) => auth.accessToken, shallowEqual);

  // console.log(accessToken);

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const data = await getUserByToken();
          const {data: user} = data.data;

          dispatch(props.fulfillUser(user));
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    // if (accessToken) {
    //   requestUser();
    // } else {
    //   dispatch(props.logout());
    //   setShowSplashScreen(false);
    // }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
};

export default connector(AuthInit);
