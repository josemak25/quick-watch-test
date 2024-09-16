import {makeUseStyles} from '../../helpers';

export const useStyle = makeUseStyles(
  ({scale, palette, colors, hexToRGB, layout}) => ({
    container: {
      flex: 1,
      paddingHorizontal: scale(layout.gutter),
    },
    contentContainerStyle: {
      flexGrow: 1,
      gap: scale(layout.gutter),
    },
    background: {
      position: 'absolute',
      transform: [{scale: 1.1}],
      right: scale(layout.gutter),
      top: scale(-layout.gutter * 1.8),
    },
    topContents: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      borderWidth: 1,
      width: scale(60, 0.25),
      height: scale(60, 0.25),
      borderRadius: scale(layout.gutter),
      borderColor: hexToRGB(palette.blue_200, 0.05),
    },
    title: {
      fontWeight: '400',
      fontSize: scale(24),
      color: hexToRGB(colors.light.white, 0.8),
    },
    gradientButtonCover: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(layout.gutter),
    },
    listHeaderComponentStyle: {
      paddingBottom: scale(layout.gutter),
      paddingTop: scale(layout.gutter * 4),
    },
    cardContainer: {
      borderWidth: 1,
      flexDirection: 'row',
      borderRadius: scale(20),
      height: scale(120, 0.25),
      justifyContent: 'center',
      paddingHorizontal: scale(layout.gutter),
      backgroundColor: hexToRGB('#0F334C', 0.8),
      borderColor: hexToRGB(palette.blue_200, 0.2),
    },
    cardImage: {
      width: scale(100, 0.25),
      height: scale(120, 0.25),
      top: scale(layout.gutter / 2),
      right: scale(layout.gutter / 2),
    },
    cardRow: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardText: {
      fontSize: scale(16),
      color: colors.light.white,
    },
    connectedText: {
      fontSize: scale(10),
      color: hexToRGB(colors.light.white, 0.5),
    },
    connectedIcon: {
      width: scale(10, 0.25),
      height: scale(10, 0.25),
      borderRadius: scale(10, 0.25),
      backgroundColor: palette.success,
    },
    connectedRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(10, 0.25),
    },
    plusShadow: {
      borderWidth: 0,
      right: scale(5),
      bottom: scale(3),
      position: 'absolute',
      backgroundColor: hexToRGB(palette.blue_200, 0.06),

      shadowColor: colors.light.white,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      elevation: 24,
      shadowRadius: 26.0,
      shadowOpacity: 12.58,
    },
  }),
);
