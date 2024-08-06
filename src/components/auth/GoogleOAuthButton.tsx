import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

import { Button, Icons } from '@/components';

type GoogleButtonProps = {
  onClick: () => void;
};

const GoogleButton = ({ onClick }: GoogleButtonProps): JSX.Element => (
  <Button variant="outline" type="button" onClick={onClick}>
    <Icons.google className="mr-2 h-4 w-4" /> Google
  </Button>
);

type GoogleOAuthButtonProps = {
  onAuthentication: (token: string) => Promise<void>;
};

export const GoogleOAuthButton = ({ onAuthentication }: GoogleOAuthButtonProps): JSX.Element => {
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

  return <GoogleButton onClick={handleButtonClick} />;
};
