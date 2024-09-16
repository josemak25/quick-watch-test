import {makeUseStyles} from '../../helpers';

export const useStyle = makeUseStyles(({scale, colors, layout}) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(layout.gutter / 2),
  },
  background: {
    position: 'absolute',
    transform: [{scale: 1.1}],
    right: scale(layout.gutter),
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: scale(14),
    color: colors.light.white,
  },
}));
