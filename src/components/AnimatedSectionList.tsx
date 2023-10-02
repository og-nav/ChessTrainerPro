import React, { useContext } from 'react';
import { SectionList, ViewProps, ViewStyle } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { defaultColors, ThemeContext } from '../contexts/ThemeContext';

const ASL = Animated.createAnimatedComponent(SectionList);

interface ASLProps extends ViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  customColors?: { light: string; dark: string };
  sections: any[];
}

const AnimatedSectionList: React.FC<ASLProps> = ({
  style,
  children,
  customColors,
  sections,
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

  return (
    <ASL {...props} sections={sections} style={[rViewStyle, style]}>
      {children}
    </ASL>
  );
};

export default AnimatedSectionList;
