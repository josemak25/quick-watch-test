import {
  Theme,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {type MainStackParamList} from '../../typings/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {makeUseStyles} from '../helpers';
import {AuthScreen} from '../screens/auth';
import {WelcomeScreen} from '../screens/welcome';

import {BottomNavigator} from './bottom_nav';
import {useStore} from '../providers/store';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const Navigation: React.FC = () => {
  const {isAuthenticated} = useStore();
  const {isDarkMode, colors, palette, styles} = useStyles();

  const theme: Theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
        text: palette.text,
        card: palette.background,
        background: palette.background,
      },
    }),
    [isDarkMode, palette.background, palette.text],
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          title: '',
          headerShown: false,
          freezeOnBlur: true,
          headerBlurEffect: 'light',
          headerBackTitleVisible: false,
          headerStyle: styles.headerStyle,
          headerTintColor: colors.light.white,
          headerTitleStyle: styles.headerTitleStyle,
        }}>
        {isAuthenticated ? (
          <Stack.Screen
            name="BottomStackScreen"
            component={BottomNavigator}
            navigationKey="AUTHENTICATED_SCREEN"
          />
        ) : (
          <Stack.Group navigationKey="UNAUTHENTICATED_SCREEN">
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{headerShown: true}}
            />

            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const useStyles = makeUseStyles(({palette, colors, fonts, scale}) => ({
  headerTitleStyle: {
    fontSize: scale(18),
    color: colors.light.white,
    fontFamily: fonts.variants.montserratMedium,
  },
  groupedHeaderTitleStyle: {
    fontWeight: '800',
    fontSize: scale(18),
    color: colors.light.white,
    fontFamily: fonts.variants.montserratBold,
  },
  headerStyle: {
    backgroundColor: palette.background,
  },
}));
