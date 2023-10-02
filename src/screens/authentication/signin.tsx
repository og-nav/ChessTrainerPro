import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedText from '../../components/AnimatedText';
import AnimatedView from '../../components/AnimatedView';

const SignIn = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <AnimatedText>Sign In</AnimatedText>
    </AnimatedView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
