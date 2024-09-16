import {NavigationProp} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  WelcomeScreen: undefined;
  AuthScreen: {title?: string};
  BottomStackScreen: undefined;
};

export type BottomTabParamList = {
  DevicesScreen: undefined;
  SettingsScreen: undefined;
};

export type MainStackScreenProps<Screen extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, Screen>;

export type MainStackNavigationProps = NavigationProp<MainStackParamList>;

export type BottomTabStackScreenProps<Screen extends keyof BottomTabParamList> =
  NativeStackScreenProps<BottomTabParamList, Screen>;

export type BottomTabStackNavigationProps = NavigationProp<BottomTabParamList>;
