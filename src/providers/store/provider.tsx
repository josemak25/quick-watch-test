import React, {PropsWithChildren, useState, useRef, useMemo} from 'react';

import {Context, storeInitialState, ContextState} from './store';

export const StoreProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [state, setState] = useState(storeInitialState);

  const onAuthenticateUser = useRef<ContextState['onAuthenticateUser']>(
    isAuthenticated =>
      setState({
        ...state,
        isAuthenticated: isAuthenticated || !state.isAuthenticated,
      }),
  ).current;

  const value: ContextState = useMemo(
    () => ({
      ...state,
      onAuthenticateUser,
    }),
    [state, onAuthenticateUser],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
