import { store } from '../src/store';
import type { RootState } from '../src/types';

export const createStoreMock = (state: RootState) => {
  return {
    ...store,
    ...state,
    getState: () => {
      return { ...store.getState(), ...state };
    }
  };
};
