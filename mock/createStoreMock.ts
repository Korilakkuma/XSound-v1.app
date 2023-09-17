import { store } from '/src/store';
import type { RootState } from '/src/store';

export const createStoreMock = (state: RootState) => {
  return {
    ...store,
    getState: () => {
      return { ...store.getState(), ...state };
    }
  };
};
