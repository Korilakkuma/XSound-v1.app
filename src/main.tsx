'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';
import routes from './routes';

if ((process.env.NODE_ENV === 'production') && navigator.serviceWorker) {
  navigator.serviceWorker.register('./assets/sw.js', { scope: './assets/' })
    .then((registration: ServiceWorkerRegistration) => {
      console.log(registration.installing);
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
