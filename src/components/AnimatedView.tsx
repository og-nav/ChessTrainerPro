import React, { useContext } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { defaultColors, ThemeContext } from '../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const AV = Animated.createAnimatedComponent(View);
const ASV = Animated.createAnimatedComponent(SafeAreaView);
interface AVProps extends ViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  customColors?: { light: string; dark: string };
  sharedTransitionTag?: string;
  sharedTransitionStyle?: any;
  safe?: boolean;
}

const AnimatedView: React.FC<AVProps> = ({
  style,
  children,
  customColors,
  sharedTransitionTag,
  sharedTransitionStyle,
  safe,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rViewStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        customColors ? customColors.light : defaultColors.light.view,
        customColors ? customColors.dark : defaultColors.dark.view,
      ],
    );
    return { backgroundColor };
  });

  return safe ? (
    <ASV
      {...props}
      style={[rViewStyle, style]}
      sharedTransitionStyle={sharedTransitionStyle}
      sharedTransitionTag={sharedTransitionTag}>
      {children}
    </ASV>
  ) : (
    <AV
      {...props}
      style={[rViewStyle, style]}
      sharedTransitionStyle={sharedTransitionStyle}
      sharedTransitionTag={sharedTransitionTag}>
      {children}
    </AV>
  );
};

export default AnimatedView;
