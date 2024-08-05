import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GOOGLE_CLIENT_ID } from './common/constants';

const AppContextProviders = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{children}</GoogleOAuthProvider>;
};

export { AppContextProviders };
