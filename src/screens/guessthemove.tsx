import React from 'react';
import Navbar from '../components/Navbar';
import { AnimatedView, AnimatedText } from '../components';

const GuessTheMove = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Guess The Move</AnimatedText>
    </AnimatedView>
  );
};

export default GuessTheMove;
