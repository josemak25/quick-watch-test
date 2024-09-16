import React from 'react';
import {View, Modal, SafeAreaView, TouchableOpacity} from 'react-native';

import {Text} from '../text';
import {makeUseStyles, reportError} from '../../helpers';
import {FallbackComponentProps} from '../../../typings/global';

type FallbackScreenProps = FallbackComponentProps & {
  isVisible?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
};

const FallbackScreenComponent: React.FC<FallbackScreenProps> = ({
  error,
  resetError,
  isModal = true,
  isVisible = false,
  buttonText = 'Try again',
  title = 'Oops, Something Went Wrong.',
  subtitle = 'The app ran into a problem and could \nnot continue. We apologize for any inconvenience this has caused! \n\nPress the button below to restart the app. \nPlease contact us if this issue persists.',
}) => {
  const {styles} = useStyles();

  const handleClearError = () => {
    if (error) {
      reportError(error);
    }
    resetError();
  };

  const Contents = (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.title, styles.subtitle]}>{subtitle}</Text>

        <TouchableOpacity style={styles.button} onPress={handleClearError}>
          <Text style={[styles.title, styles.text]}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return isModal ? (
    <Modal animationType="slide" visible={isVisible}>
      {Contents}
    </Modal>
  ) : (
    Contents
  );
};

const useStyles = makeUseStyles(
  ({scale, fonts, palette, layout, hexToRGB}) => ({
    safeView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      maxWidth: scale(425),
      justifyContent: 'center',
      padding: scale(layout.gutter),
    },
    title: {
      fontWeight: '600',
      textAlign: 'center',
      color: palette.text,
      fontSize: scale(20),
      marginTop: scale(layout.gutter * 2),
      fontFamily: fonts.variants.montserratBold,
    },
    subtitle: {
      opacity: 0.7,
      fontWeight: '400',
      fontSize: scale(15),
      lineHeight: scale(18),
      paddingHorizontal: scale(10),
      marginTop: scale(layout.gutter),
      marginVertical: scale(layout.gutter),
      fontFamily: fonts.variants.montserratMedium,
    },
    button: {
      borderWidth: 1,
      height: scale(50),
      alignItems: 'center',
      minWidth: scale(300),
      justifyContent: 'center',
      marginVertical: scale(14),
      borderColor: hexToRGB(palette.text, 0.2),
      borderRadius: scale(layout.radius / 2),
    },
    text: {
      marginTop: 0,
      fontSize: scale(14),
      fontFamily: fonts.variants.montserratSemibold,
    },
  }),
);

export const FallbackScreen = React.memo(FallbackScreenComponent);
