// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";

import App from './app/app';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}
