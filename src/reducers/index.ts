import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

export const rootReducer = (history: History) => combineReducers({
  router : connectRouter(history)
});
