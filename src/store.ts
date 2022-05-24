import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { rootReducer } from './reducers';

const history    = createBrowserHistory();
const middleware = routerMiddleware(history);
const store      = createStore(rootReducer(), compose(applyMiddleware(middleware)));

export {
  store,
  history
};
