import { store } from '../src/store';
import { IState } from '../src/types';

export const createStoreMock = (state: IState) => {
  return {
    ...store,
    ...state,
    getState: () => {
      return { ...store.getState(), ...state };
    }
  };
};