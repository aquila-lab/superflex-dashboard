import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import posthog from 'posthog-js';

import './index.css';
import App from './App';
import store from './core/store';
import { IS_PROD, POSTHOG_API_KEY } from './common/constants';

// Initialize PostHog
if (IS_PROD) {
  posthog.init(POSTHOG_API_KEY, { api_host: 'https://app.posthog.com' });
}

const Root = (): JSX.Element => (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<Root />);
