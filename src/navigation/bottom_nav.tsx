import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {Image, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

Feather.loadFont(); // <- Load font here
Ionicons.loadFont(); // <- Load font here

import {AppImages, makeUseStyles} from '../helpers';
import {DevicesScreen} from '../screens/devices';
import {SettingsScreen} from '../screens/settings';
import {Bounceable} from '../components/bounceable';
import {
  BottomTabParamList,
  MainStackScreenProps,
} from '../../typings/navigation';
import {Text} from '../components/text';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomNavigator: React.FC<
  MainStackScreenProps<'BottomStackScreen'>
> = () => {
  const {styles, scale, hexToRGB, palette} = useStyles();

  const CustomTabBar = useCallback(
    ({state, descriptors, navigation}: BottomTabBarProps) => {
      return (
        <View style={styles.containerStyle}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];
            const name = route.name as keyof BottomTabParamList;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({type: 'tabLongPress', target: route.key});
            };

            const Icon = () => {
              const mapper: Record<
                keyof Omit<BottomTabParamList, 'ProfileScreen'>,
                React.ReactNode
              > = {
                DevicesScreen: (
                  <Ionicons
                    size={scale(24)}
                    name="grid-outline"
                    color={
                      isFocused ? palette.white : hexToRGB(palette.white, 0.2)
                    }
                  />
                ),
                SettingsScreen: (
                  <Feather
                    name="settings"
                    size={scale(24)}
                    color={
                      isFocused ? palette.white : hexToRGB(palette.white, 0.2)
                    }
                  />
                ),
              };

              return mapper[name];
            };

            return (
              <Bounceable
                key={route.key}
                onPress={onPress}
                isBounceable={false}
                onLongPress={onLongPress}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                animationProps={{scaleInValue: 0.9}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityState={isFocused ? {selected: true} : {}}
                style={[
                  styles.button,
                  index === 1 && styles.rightButtonBorder,
                ]}>
                <Icon />
                <Text
                  style={[
                    styles.bottomTextStyle,
                    isFocused && styles.activeBottomTextStyle,
                  ]}>
                  {name.replace('Screen', '')}
                </Text>
              </Bounceable>
            );
          })}
        </View>
      );
    },
    [scale, styles, hexToRGB, palette.white],
  );

  return (
    <BottomTab.Navigator
      tabBar={CustomTabBar}
      initialRouteName="DevicesScreen"
      screenOptions={{
        title: '',
        headerShown: true,
        freezeOnBlur: true,
        headerShadowVisible: false,
        headerTitleStyle: styles.headerTitleStyle,
        headerLeftContainerStyle: styles.headerContainerStyle,
        headerRightContainerStyle: styles.headerContainerStyle,
        headerBackgroundContainerStyle: styles.headerBackgroundContainerStyle,
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => (
          <Bounceable style={styles.burgerContainer}>
            <View style={styles.firstBurger} />
            <View style={[styles.firstBurger, styles.secondBurger]} />
          </Bounceable>
        ),
        // eslint-disable-next-line react/no-unstable-nested-components
        headerRight: () => (
          <Bounceable onPress={() => {}}>
            <Image
              source={AppImages.images['avatar-notification']}
              style={styles.notificationContainer}
            />
          </Bounceable>
        ),
      }}>
      <BottomTab.Screen name="DevicesScreen" component={DevicesScreen} />
      <BottomTab.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
};

const useStyles = makeUseStyles(
  ({palette, colors, hexToRGB, fonts, scale, layout}) => ({
    containerStyle: {
      borderTopWidth: 1,
      flexDirection: 'row',
      backgroundColor: palette.dark_blue_200,
      borderTopColor: hexToRGB(palette.blue_100, 0.2),
    },
    button: {
      flex: 1,
      height: scale(93),
      alignItems: 'center',
      justifyContent: 'center',
      gap: scale(layout.gutter / 2),
      paddingBottom: scale(layout.gutter),
      backgroundColor: hexToRGB('#0F334C', 0.3),
    },
    rightButtonBorder: {
      borderLeftWidth: 1,
      borderLeftColor: hexToRGB(palette.blue_100, 0.2),
    },
    headerTitleStyle: {
      fontSize: scale(18),
      color: colors.light.white,
      fontFamily: fonts.variants.montserratMedium,
    },
    bottomTextStyle: {
      fontWeight: '400',
      fontSize: scale(13),
      textTransform: 'capitalize',
      color: hexToRGB(colors.light.white, 0.2),
    },
    activeBottomTextStyle: {
      color: colors.light.white,
    },
    headerBackgroundContainerStyle: {
      borderBottomWidth: 1,
      height: scale(layout.gutter * 7),
      borderBottomColor: hexToRGB(palette.blue_100, 0.2),
    },
    burgerContainer: {
      gap: scale(layout.gutter / 2),
      width: scale(layout.gutter * 2),
    },
    firstBurger: {
      width: '100%',
      height: scale(2),
      borderRadius: scale(layout.gutter),
      backgroundColor: colors.light.white,
    },
    secondBurger: {
      width: '50%',
    },
    headerContainerStyle: {
      paddingTop: scale(layout.gutter / 2),
      paddingHorizontal: scale(layout.gutter),
    },
    notificationContainer: {
      width: scale(50),
      height: scale(50),
    },
  }),
);
