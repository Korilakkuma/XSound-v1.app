import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, legacy_createStore } from 'redux';

import { rootReducer } from './reducers';

const history    = createBrowserHistory();
const middleware = routerMiddleware(history);
const store      = legacy_createStore(rootReducer(), compose(applyMiddleware(middleware)));

export {
  store,
  history
};
