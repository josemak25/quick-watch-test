import React, {useCallback, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

Ionicons.loadFont(); // <- Load font here
AntDesign.loadFont(); // <- Load font here

import {Text} from '../../components/text';
import {BottomTabStackScreenProps} from '../../../typings/navigation';

import {AppImages} from '../../helpers';
import {useStyle} from './devices.styles';
import {Bounceable} from '../../components/bounceable';

const list = [
  {title: 'Pulse XS Pro', image: AppImages.images['watch-two']},
  {title: 'Pressure X Pro', image: AppImages.images['watch-one']},
];

export const DevicesScreen: React.FC<
  BottomTabStackScreenProps<'DevicesScreen'>
> = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const {palette, colors, layout, scale, hexToRGB, styles} = useStyle();

  const renderItem: ListRenderItem<(typeof list)[number]> = useCallback(
    ({item}) => (
      <Bounceable
        onPress={() => {}}
        style={styles.cardContainer}
        animationProps={{scaleInValue: 0.98}}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardRow}>
          <View style={{gap: scale(layout.gutter)}}>
            <Text style={[styles.title, styles.cardText]}>{item.title}</Text>
            <View style={styles.connectedRow}>
              <View style={styles.connectedIcon} />
              <Text style={[styles.title, styles.connectedText]}>
                Connected
              </Text>
            </View>
          </View>

          <Ionicons
            size={scale(24)}
            color={palette.grey}
            name="chevron-forward"
          />
        </View>
      </Bounceable>
    ),
    [layout.gutter, palette.grey, scale, styles],
  );

  const onRefresh = () => {
    setIsRefetching(true);
    setTimeout(() => setIsRefetching(false), 2000);
  };

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

      <FlatList
        data={list}
        onRefresh={onRefresh}
        renderItem={renderItem}
        refreshing={isRefetching}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={isRefetching}
            tintColor={colors.light.white}
            progressViewOffset={scale(layout.gutter * 4)}
          />
        }
        ListHeaderComponent={
          <View style={styles.topContents}>
            <Text style={styles.title}>Devices</Text>
            <Bounceable style={styles.button} onPress={() => {}}>
              <View style={[styles.button, styles.plusShadow]} />
              <LinearGradient
                end={{x: 1.5, y: 1}}
                start={{x: 0, y: 0}}
                style={styles.gradientButtonCover}
                colors={[palette.dark_blue_200, palette.dark_blue_100]}>
                <AntDesign
                  name="plus"
                  size={scale(20)}
                  color={hexToRGB(colors.light.white, 0.6)}
                />
              </LinearGradient>
            </Bounceable>
          </View>
        }
      />
    </LinearGradient>
  );
};
