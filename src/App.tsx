import './App.css';

import React from 'react';

import AppPages from '@/pages/AppPages';
import { useAppSelector } from '@/core/store';
import { useLoginToken } from '@/hooks/useLoginToken';
import { LoadingSpinner, Toaster } from '@/components';
import { AppContextProviders } from './AppContextProviders';

const App = (): JSX.Element => {
  const isLoginPending = useAppSelector((state) => state.auth.isLoginPending);

  useLoginToken();

  if (isLoginPending) {
    return <LoadingSpinner />;
  }

  return (
    <AppContextProviders>
      <div className="App">
        <div id="AppContent" className="h-full">
          <AppPages />
        </div>
        <Toaster />
      </div>
    </AppContextProviders>
  );
};

export default App;
