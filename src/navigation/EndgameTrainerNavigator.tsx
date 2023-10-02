import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories, Subcategories, Positions, Game } from '../screens';
import { EndgameNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<EndgameNavigatorParamList>();

export default function EndgameTrainerNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Categories">
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Subcategories" component={Subcategories} />
      <Stack.Screen name="Positions" component={Positions} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}
