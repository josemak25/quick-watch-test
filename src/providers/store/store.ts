import {createContext, useContext} from 'react';

export interface IStoreState {
  isAuthenticated: boolean;
}

export type ContextState = IStoreState & {
  onAuthenticateUser: (isAuthenticated?: boolean) => void;
};

export const storeInitialState: IStoreState = {
  isAuthenticated: false,
};

export const Context = createContext<ContextState>(
  storeInitialState as ContextState,
);

export const useStore = () => useContext(Context);
