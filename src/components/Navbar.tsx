import React, { useCallback } from 'react';
import { defaultColors, primary } from '../contexts/ThemeContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { AnimatedView, AnimatedText, AnimatedFeather } from '../components';

const Navbar: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);
  const route = useRoute();

  return (
    <AnimatedView
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        marginLeft: 10,
      }}>
      <AnimatedFeather
        onPress={handlePressMenuButton}
        name="menu"
        size={35}
        style={{ marginLeft: 10, marginRight: 10 }}
        customColors={{ light: primary[900], dark: primary[100] }}
        customBackgroundColors={{
          light: defaultColors.light.view,
          dark: defaultColors.dark.view,
        }}
      />

      <AnimatedText style={{ fontSize: 17, marginLeft: 10 }}>
        {route.name}
      </AnimatedText>
    </AnimatedView>
  );
};

export default React.memo(Navbar);
