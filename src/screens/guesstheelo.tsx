import React from 'react';
import Navbar from '../components/Navbar';
import { AnimatedView, AnimatedText } from '../components';

const GuessTheElo = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Guess The Elo</AnimatedText>
    </AnimatedView>
  );
};

export default GuessTheElo;
