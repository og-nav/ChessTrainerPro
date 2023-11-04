import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import {
  AnimatedView,
  AnimatedText,
  AnimatedTouchableOpacity,
} from '../../components';
import { BlindfoldChessContext } from '../../contexts/BlindfoldChessContext';

const BlindfoldChessSettings = () => {
  const {
    blindfoldChessboardRef,
    setGameHistory,
    playAsBlack,
    setPlayAsBlack,
  } = useContext(BlindfoldChessContext);

  const newGame = useCallback(() => {
    blindfoldChessboardRef?.current?.resetBoard();
    setGameHistory([]);
  }, [blindfoldChessboardRef, setGameHistory]);
  return (
    <AnimatedView style={{ flex: 1, alignItems: 'center' }} safe={true}>
      <AnimatedTouchableOpacity
        style={styles.button}
        onPress={() => {
          newGame();
          setPlayAsBlack(playAsBlack ? false : true);
        }}
      >
        <AnimatedText>New Game</AnimatedText>
      </AnimatedTouchableOpacity>

      <AnimatedTouchableOpacity
        style={styles.button}
        onPress={() => {
          newGame();
          setPlayAsBlack(playAsBlack ? false : true);
        }}
      >
        <AnimatedText>Change sides</AnimatedText>
      </AnimatedTouchableOpacity>
    </AnimatedView>
  );
};

export default BlindfoldChessSettings;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
