import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from '../contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function AppContainer(props: Props) {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <ThemeProvider>{props.children}</ThemeProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
/*
export default function AppContainer(props: Props) {
  return <View style={{ backgroundColor: 'red', flex: 1 }}></View>;
}
*/
