import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

import GoogleLogoSvg from '../../assets/images/google-logo.svg';
import { Button } from '../ui/Button';

type GoogleButtonProps = {
  label: string;
  onClick: () => void;
};

const GoogleButton = ({ label, onClick }: GoogleButtonProps): JSX.Element => (
  <Button variant={'outline'} className="w-full gap-2" onClick={onClick}>
    <img className="size-6" src={GoogleLogoSvg} alt="Google" />
    <div>{label}</div>
  </Button>
);

type GoogleLoginButtonProps = {
  label: string;
  onAuthentication: (token: string) => Promise<void>;
};

const GoogleLoginButton = ({ label, onAuthentication }: GoogleLoginButtonProps): JSX.Element => {
  function responseGoogle(response: any): void {
    const { code, error } = response;

    if (error) {
      return;
    }

    if (onAuthentication && code) {
      onAuthentication(code);
    }
  }

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  });

  function handleButtonClick(): void {
    login();
  }

  return <GoogleButton onClick={handleButtonClick} label={label} />;
};

export default GoogleLoginButton;
