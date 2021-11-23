import React from 'react';
import { Route } from 'react-router-dom';
import { App } from './components/App';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const Router: React.FC<Props> = () => {
  return (
    <Route path="/">
      <App />
    </Route>
  );
};
