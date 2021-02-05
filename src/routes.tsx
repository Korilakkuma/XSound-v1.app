import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { App } from './components/App';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const Routes: React.FC<Props> = () => (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
  </Switch>
);
