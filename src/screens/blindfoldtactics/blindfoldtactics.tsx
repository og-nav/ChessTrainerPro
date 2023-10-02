import React from 'react';
import { StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';
import AnimatedText from '../../components/AnimatedText';
import AnimatedView from '../../components/AnimatedView';
import RangeSlider from '../../components/rangeslider/RangeSlider';

const BlindfoldTactics = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>sup</AnimatedText>
      <RangeSlider />
    </AnimatedView>
  );
};

export default BlindfoldTactics;

const styles = StyleSheet.create({});
