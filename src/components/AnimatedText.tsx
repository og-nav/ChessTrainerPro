import React, { useContext } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { defaultColors, ThemeContext } from '../contexts/ThemeContext';

const AT = Animated.createAnimatedComponent(Text);
interface ATProps extends TextProps {
  style?: TextStyle;
  children?: React.ReactNode;
  customColors?: { light: string; dark: string };
}

const AnimatedText: React.FC<ATProps> = ({
  style,
  children,
  customColors,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        customColors ? customColors.light : defaultColors.light.text,
        customColors ? customColors.dark : defaultColors.dark.text,
      ],
    );
    return { color };
  });

  return (
    <AT {...props} style={[rTextStyle, style]}>
      {children}
    </AT>
  );
};

export default AnimatedText;
