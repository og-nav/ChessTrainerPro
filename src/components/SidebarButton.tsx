import React, { useContext } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeContext, primary } from '../contexts/ThemeContext';
import AnimatedTouchableOpacity from './AnimatedTouchableOpacity';

interface SidebarButtonProps {
  active: boolean;
  icon: string;
  onPress?: () => void;
  children: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  active,
  icon,
  onPress,
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <AnimatedTouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 10,
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
      }}
      customColors={
        active
          ? { light: primary[300], dark: primary[300] }
          : { light: primary[100], dark: primary[700] }
      }
      onPress={onPress}>
      <FontAwesome5
        name={icon}
        size={20}
        opacity={1}
        color={theme === 'dark' ? 'white' : primary[900]}
        marginRight={10}
      />
      {children}
    </AnimatedTouchableOpacity>
  );
};

export default SidebarButton;
