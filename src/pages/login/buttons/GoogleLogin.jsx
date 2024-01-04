import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { setCookie } from '../../../utils/cookie';
import { ReactComponent as GoogleIcon } from '../../../assets/googleIcon.svg';
import LoginButton from '../LoginButton';

const GoogleLogin = () => {
  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: async credentialResponse => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/login`,
        {
          authCode: credentialResponse.code,
          provider: 'GOOGLE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const access = response.headers.get('Gauth');
      const refresh = response.headers.get('RefreshToken');

      setCookie('Access', access);
      setCookie('Refresh', refresh);

      const { data } = response;
      console.log(data.username, data.isFirst);
    },
    onError: error => {
      console.log('Error: ', error);
    },
    flow: 'auth-code',
  });
  return (
    <LoginButton
      icon={<GoogleIcon />}
      bgColor="bg-white"
      click={handleClickGoogleLogin}
    />
  );
};

export default GoogleLogin;
