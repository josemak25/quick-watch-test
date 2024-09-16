import {buildProvidersTree} from '../helpers';

import {StoreProvider} from './store';
import {SafeAreaProvider} from './safearea';
import {StatusBarProvider} from './statusbar';

export const Providers = buildProvidersTree([
  SafeAreaProvider,
  StatusBarProvider,
  StoreProvider,
]);
