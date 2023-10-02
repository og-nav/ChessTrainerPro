import React, { useContext } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { defaultColors, ThemeContext } from '../contexts/ThemeContext';

const ATO = Animated.createAnimatedComponent(TouchableOpacity);
interface ATOProps extends TouchableOpacityProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  customColors?: { light: string; dark: string };
}

const AnimatedTouchableOpacity: React.FC<ATOProps> = ({
  style,
  children,
  customColors,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rTouchableOpacityStyle = useAnimatedStyle(() => {
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
    <ATO {...props} style={[style, rTouchableOpacityStyle]}>
      {children}
    </ATO>
  );
};

export default AnimatedTouchableOpacity;
