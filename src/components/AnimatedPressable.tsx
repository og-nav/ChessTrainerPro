import React, { useContext } from 'react';
import { PressableProps, Pressable, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { defaultColors, ThemeContext } from '../contexts/ThemeContext';

const AP = Animated.createAnimatedComponent(Pressable);
interface APProps extends PressableProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  customColors?: { light: string; dark: string };
  sharedTransitionTag?: string;
  sharedTransitionStyle?: any;
}

const AnimatedPressable: React.FC<APProps> = ({
  style,
  children,
  customColors,
  sharedTransitionTag,
  sharedTransitionStyle,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rPressableStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        customColors ? customColors.light : defaultColors.light.pressable,
        customColors ? customColors.dark : defaultColors.dark.pressable,
      ],
    );
    return { backgroundColor };
  });

  return (
    <AP
      {...props}
      style={[style, rPressableStyle]}
      sharedTransitionStyle={sharedTransitionStyle}
      sharedTransitionTag={sharedTransitionTag}>
      {children}
    </AP>
  );
};

export default AnimatedPressable;
