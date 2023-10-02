import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, SignIn, SignUp } from '../screens';
import { AuthenticationParamList } from './types';

const AuthenticationStack =
  createNativeStackNavigator<AuthenticationParamList>();

export default function AuthenticationNavigator() {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Sign In" component={SignIn} />
      <AuthenticationStack.Screen name="Sign Up" component={SignUp} />
    </AuthenticationStack.Navigator>
  );
}
