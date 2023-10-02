import React, { useContext } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { defaultColors, primary, ThemeContext } from '../contexts/ThemeContext';
import AnimatedPressable from './AnimatedPressable';
import { ViewStyle } from 'react-native';

const AF = Animated.createAnimatedComponent(Feather);
interface AFProps {
  name: any;
  size: number;
  customColors?: { light: string; dark: string };
  customBackgroundColors?: { light: string; dark: string };
  onPress?: () => void;
  style?: ViewStyle;
}

const AnimatedFeather: React.FC<AFProps> = ({
  name,
  size,
  customColors,
  customBackgroundColors,
  onPress,
  style,
}) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rFeatherStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        customColors ? customColors.light : defaultColors.light.pressable,
        customColors ? customColors.dark : defaultColors.dark.pressable,
      ],
    );
    return { color };
  });

  return (
    <AnimatedPressable
      customColors={
        customBackgroundColors
          ? customBackgroundColors
          : { light: primary[100], dark: primary[700] }
      }
      onPress={onPress}>
      <AF
        name={name}
        size={size}
        style={[style, rFeatherStyle]}
        animatedProps={rFeatherStyle}
      />
    </AnimatedPressable>
  );
};

export default AnimatedFeather;
