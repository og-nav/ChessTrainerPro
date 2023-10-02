import React from 'react';
//import { AnimatedFeather, AnimatedPressable } from '../components';
import AnimatedFeather from './AnimatedFeather';
import AnimatedPressable from './AnimatedPressable';
import { primary } from '../contexts/ThemeContext';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const cc = { light: primary[100], dark: primary[700] };
  return (
    <AnimatedPressable
      customColors={cc}
      style={{
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginLeft: 20,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <AnimatedFeather
        onPress={onPress}
        name={'chevron-left'}
        size={30}
        customColors={{ light: primary[900], dark: 'white' }}
        style={{ marginBottom: 0 }}
      />
    </AnimatedPressable>
  );
};

export default BackButton;
