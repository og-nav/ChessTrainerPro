import React from 'react';
//import { useAuthentication } from '../hooks/useAuthentication';
import SidebarNavigator from './SidebarNavigator';
//import AuthenticationNavigator from './AuthenticationNavigator';

export default function RootStackNavigator() {
  //const { user } = useAuthentication();

  // will deal with authentication in the future
  //return user ? <SidebarNavigator /> : <AuthenticationNavigator />;
  return <SidebarNavigator />;
}
