import React, { useContext } from 'react';
import { Switch } from 'react-native';
import {
  switch_track_color,
  ThemeContext,
  primary,
} from '../contexts/ThemeContext';
import AnimatedView from './AnimatedView';
import AnimatedText from './AnimatedText';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <AnimatedView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -5,
      }}
      customColors={{ light: primary[100], dark: primary[700] }}>
      <AnimatedText style={{ marginRight: 5 }}>Light</AnimatedText>
      <Switch
        value={theme === 'dark'}
        onValueChange={() => {
          toggleTheme();
        }}
        trackColor={switch_track_color}
        thumbColor={primary[500]}
        style={{ height: 30 }}
      />
      <AnimatedText style={{ marginLeft: 5 }}>Dark</AnimatedText>
    </AnimatedView>
  );
};

export default ThemeToggle;
