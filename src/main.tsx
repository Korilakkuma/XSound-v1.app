'use strict';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '/src/components/App';
import { store } from '/src/store';

const container = document.getElementById('app')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
