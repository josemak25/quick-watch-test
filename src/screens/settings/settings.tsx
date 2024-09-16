import React from 'react';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont(); // <- Load font here

import {Text} from '../../components/text';
import {BottomTabStackScreenProps} from '../../../typings/navigation';

import {AppImages} from '../../helpers';
import {useStyle} from './settings.styles';
import {APP_NAME, APP_VERSION} from '../../constants';

export const SettingsScreen: React.FC<
  BottomTabStackScreenProps<'SettingsScreen'>
> = () => {
  const {palette, styles} = useStyle();

  return (
    <LinearGradient
      end={{x: 0.5, y: 0.3}}
      start={{x: 0.5, y: 0}}
      style={styles.container}
      colors={[palette.dark_blue_100, palette.dark_blue_200]}>
      <Image
        style={styles.background}
        source={AppImages.images['main-background']}
      />

      <Text style={styles.text}>Name: {APP_NAME}</Text>
      <Text style={styles.text}>Build: {APP_VERSION}</Text>
    </LinearGradient>
  );
};
