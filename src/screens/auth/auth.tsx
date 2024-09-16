import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont(); // <- Load font here

import {useStyle} from './auth.styles';
import {AppImages} from '../../helpers';
import {Text} from '../../components/text';
import {Bounceable} from '../../components/bounceable';
import {MainStackScreenProps} from '../../../typings/navigation';
import {TextInput} from 'react-native-gesture-handler';
import {useStore} from '../../providers/store';

export const AuthScreen: React.FC<MainStackScreenProps<'AuthScreen'>> = ({
  route,
  navigation,
}) => {
  const {onAuthenticateUser} = useStore();
  const {palette, colors, hexToRGB, scale, styles} = useStyle();

  useEffect(() => {
    navigation.setOptions({title: route.params?.title});
  }, [navigation, route.params.title]);

  return (
    <LinearGradient
      end={{x: 0.5, y: 0.3}}
      start={{x: 0.5, y: 0}}
      style={styles.container}
      colors={[palette.dark_blue_100, palette.dark_blue_200]}>
      <Image
        style={styles.background}
        source={AppImages.images['auth-background']}
      />

      <View style={styles.contents}>
        <View style={styles.form}>
          <LinearGradient
            end={{x: 1.5, y: 1}}
            start={{x: 0, y: 0}}
            style={[styles.button, styles.socialButton, styles.inputGradient]}
            colors={[
              hexToRGB(palette.dark_blue_100, 0.7),
              hexToRGB(palette.dark_blue_100, 0.7),
            ]}>
            <TextInput
              defaultValue=""
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor={hexToRGB(colors.light.white, 0.5)}
            />
          </LinearGradient>

          <LinearGradient
            end={{x: 1.5, y: 1}}
            start={{x: 0, y: 0}}
            style={[styles.button, styles.socialButton, styles.inputGradient]}
            colors={[
              hexToRGB(palette.dark_blue_100, 0.7),
              hexToRGB(palette.dark_blue_100, 0.7),
            ]}>
            <TextInput
              defaultValue=""
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor={hexToRGB(colors.light.white, 0.5)}
            />
          </LinearGradient>

          <Bounceable
            style={styles.button}
            onPress={() => onAuthenticateUser()}>
            <LinearGradient
              end={{x: 1.5, y: 1}}
              start={{x: 0, y: 0}}
              style={styles.gradientButtonCover}
              colors={[palette.blue_200, palette.blue_100]}>
              <Text style={styles.text}>{route.params?.title}</Text>
            </LinearGradient>
          </Bounceable>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={[styles.text, styles.dividerText]}>or</Text>
          <View style={styles.divider} />
        </View>

        <Bounceable style={[styles.button, styles.socialButton]}>
          <LinearGradient
            end={{x: 2, y: 1}}
            start={{x: 0, y: 0}}
            style={[styles.gradientButtonCover, styles.row]}
            colors={[palette.dark_blue_200, palette.dark_blue_100]}>
            <Image source={AppImages.images['google-icon']} />
            <Text style={[styles.text, styles.socialText]}>
              Continue with Google
            </Text>
            <Ionicons
              size={scale(24)}
              color={palette.grey}
              name="chevron-forward"
            />
          </LinearGradient>
        </Bounceable>

        <Bounceable style={[styles.button, styles.socialButton]}>
          <LinearGradient
            end={{x: 2, y: 1}}
            start={{x: 0, y: 0}}
            style={[styles.gradientButtonCover, styles.row]}
            colors={[palette.dark_blue_200, palette.dark_blue_100]}>
            <Ionicons
              size={scale(24)}
              name="logo-apple"
              color={colors.light.white}
            />
            <Text style={[styles.text, styles.socialText]}>
              Continue with Apple
            </Text>
            <Ionicons
              size={scale(24)}
              color={palette.grey}
              name="chevron-forward"
            />
          </LinearGradient>
        </Bounceable>

        <Text style={[styles.text, styles.haveAnAccount]}>
          Already have an account?
        </Text>
      </View>
    </LinearGradient>
  );
};
