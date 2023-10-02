import React from 'react';
import Navbar from '../components/Navbar';
import { AnimatedView, AnimatedText } from '../components';

const Evaluation = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Evaluation</AnimatedText>
    </AnimatedView>
  );
};

export default Evaluation;
