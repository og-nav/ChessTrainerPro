import React from 'react';
import Navbar from '../components/Navbar';
import { AnimatedView, AnimatedText } from '../components';
import RangeSlider from '../components/rangeslider/RangeSlider';

const RegularTactics = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Regular Tactics</AnimatedText>
      <RangeSlider />
    </AnimatedView>
  );
};

export default RegularTactics;
