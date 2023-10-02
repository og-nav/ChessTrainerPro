// inspired by Reactiive
// https://www.youtube.com/watch?v=KlUi2BCUIic
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { primary } from '../contexts/ThemeContext';

interface SlidingCounterProps {
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const iconSize = 30;
const buttonWidth = 170;

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const SlidingCounter: React.FC<SlidingCounterProps> = ({
  minValue,
  maxValue,
  defaultValue,
  count,
  setCount,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  //const [count, setCount] = useState(0);

  const MAX_SLIDE_OFFSET = buttonWidth * 0.3;

  const incrementCount = useCallback(() => {
    setCount((currentCount) =>
      maxValue ? Math.min(currentCount + 1, maxValue) : currentCount + 1,
    );

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [maxValue, setCount]);

  const decrementCount = useCallback(() => {
    setCount((currentCount) =>
      minValue ? Math.max(currentCount - 1, minValue) : currentCount - 1,
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [minValue, setCount]);

  const resetCount = useCallback(() => {
    setCount(defaultValue ? defaultValue : 0);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [defaultValue, setCount]);

  const onPanGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = clamp(
          event.translationX,
          -MAX_SLIDE_OFFSET,
          MAX_SLIDE_OFFSET,
        );
        translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
      },
      onEnd: () => {
        if (translateX.value === MAX_SLIDE_OFFSET) {
          runOnJS(incrementCount)();
        } else if (translateX.value === -MAX_SLIDE_OFFSET) {
          runOnJS(decrementCount)();
        } else if (translateY.value === MAX_SLIDE_OFFSET) {
          runOnJS(resetCount)();
        }

        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4],
    );
    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
    );

    return {
      opacity: opacityX * opacityY,
      zIndex: 5,
    };
  });

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8],
    );

    return {
      opacity,
    };
  }, []);

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1,
        },
        { translateY: translateY.value * 0.1 },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.button, rButtonStyle]}>
        <Animated.View style={rPlusMinusIconStyle}>
          <AntDesign
            name="minus"
            color={'white'}
            size={iconSize}
            onPress={decrementCount}
          />
        </Animated.View>
        <Animated.View style={rCloseIconStyle}>
          <AntDesign name="close" color={'white'} size={iconSize} />
        </Animated.View>
        <Animated.View style={rPlusMinusIconStyle}>
          <AntDesign
            name="plus"
            color={'white'}
            size={iconSize}
            onPress={incrementCount}
          />
        </Animated.View>

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.View style={[styles.circle, rStyle]}>
              <Text style={styles.countText}>{count}</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Animated.View>
    </View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 70,
    width: buttonWidth,
    backgroundColor: primary[900],
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  countText: {
    fontSize: 25,
    color: 'white',
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: primary[700],
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
