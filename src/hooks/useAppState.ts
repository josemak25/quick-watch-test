import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export interface AppStateHookSettings {
  onForeground?: () => void;
  onBackground?: () => void;
  onChange?: (status: AppStateStatus) => void;
}

export const useAppState = (
  settings: AppStateHookSettings,
  extraDeps: React.DependencyList = [],
) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const {onChange = noop, onForeground = noop, onBackground = noop} = settings;

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'active' && appState !== 'active') {
        isFunction(onForeground) && onForeground();
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        isFunction(onBackground) && onBackground();
      }

      setAppState(nextAppState);
      isFunction(onChange) && onChange(nextAppState);
    }

    const nextAppState = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => nextAppState.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, onForeground, onBackground, appState, ...extraDeps]);

  return {appState};
};
