import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { App } from './components';

export default (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
  </Switch>
);
