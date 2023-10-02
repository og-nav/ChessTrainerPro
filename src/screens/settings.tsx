import React from 'react';
//import { StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { AnimatedText, AnimatedView } from '../components';

const Settings = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>sup</AnimatedText>
    </AnimatedView>
  );
};

export default Settings;
