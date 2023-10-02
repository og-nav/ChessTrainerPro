import React from 'react';
import Navbar from '../components/Navbar';
import { AnimatedView, AnimatedText } from '../components';

const TacticalForesight = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Tactical Foresight</AnimatedText>
    </AnimatedView>
  );
};

export default TacticalForesight;
