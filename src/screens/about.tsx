import React from 'react';
import { StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import AnimatedText from '../components/AnimatedText';
import AnimatedView from '../components/AnimatedView';

const About = () => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>sup</AnimatedText>
    </AnimatedView>
  );
};

export default About;

const styles = StyleSheet.create({});
//CREDITS
/*
AUDIO: lichess.org
PUZZLES: lichess.org
GM GAMES: pgnmentor.com
Chessboard: Reactiive

*/
