import { SharedTransition, withTiming } from 'react-native-reanimated';
export const sharedTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withTiming(values.targetHeight, { duration: 2000 }),
    width: withTiming(values.targetWidth, { duration: 2000 }),
    originX: withTiming(values.targetOriginX, { duration: 2000 }),
    originY: withTiming(values.targetOriginY, { duration: 2000 }),
  };
});
