import React from 'react';
import AppContainer from './src/components/AppContainer';
import RootStackNavigator from './src/navigation/RootStackNavigator';

export default function App() {
  return (
    <AppContainer>
      <RootStackNavigator />
    </AppContainer>
  );
}
