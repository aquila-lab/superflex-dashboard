import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './core/store';

const Root = (): JSX.Element => (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Root />);
