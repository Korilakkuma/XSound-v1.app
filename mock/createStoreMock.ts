import { store } from '/src/store';
import type { RootState } from '/src/store';

export const createStoreMock = (state?: Partial<RootState>) => {
  return {
    ...store,
    getState: () => {
      return { ...store.getState(), ...state };
    }
  };
};
