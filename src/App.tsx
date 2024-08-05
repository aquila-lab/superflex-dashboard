import './App.css';

import React, { useEffect } from 'react';
import { Toaster } from 'sonner';

import { fetchOrganizations } from './core/organization/organizationSlice';
import AppPages from './pages/AppPages';
import { useLoginToken } from './hooks/useLoginToken';
import { AppContextProviders } from './AppContextProviders';
import { useAppDispatch, useAppSelector } from './core/store';
import { AppLoader } from './components';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoginPending = useAppSelector((state) => state.auth.isLoginPending);
  const token = useAppSelector((state) => state.auth.token);

  useLoginToken();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(fetchOrganizations());
  }, [token]);

  if (isLoginPending) {
    return <AppLoader />;
  }

  return (
    <AppContextProviders>
      <div className="App h-full">
        <div id="AppContent" className="h-full">
          <AppPages />
        </div>
        <Toaster richColors position="bottom-right" />
      </div>
    </AppContextProviders>
  );
};

export default App;
