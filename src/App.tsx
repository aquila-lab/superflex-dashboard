import './App.css';

import React from 'react';
import { Toaster } from 'sonner';

import AppPages from './pages/AppPages';
import { AppLoader } from './components';
import { useLoginToken } from './hooks/useLoginToken';
import { AppContextProviders } from './AppContextProviders';
import { useAppSelector } from './core/store';

const App = (): JSX.Element => {
  const isLoginPending = useAppSelector((state) => state.auth.isLoginPending);

  useLoginToken();

  if (isLoginPending) {
    return <AppLoader />;
  }

  return (
    <AppContextProviders>
      <div className="App">
        <div id="AppContent" className="h-full">
          <AppPages />
        </div>
        <Toaster richColors position="bottom-right" />
      </div>
    </AppContextProviders>
  );
};

export default App;
