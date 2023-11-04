import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Chess, Move } from 'chess.js';
import Navbar from '../components/Navbar';
import {
  AnimatedView,
  AnimatedText,
  AnimatedTouchableOpacity,
  Toast,
} from '../components';
import { nextMindMeldSquare, setupBoard } from '../util';
import Chessboard, { ChessboardRef } from '../components/chessboard';
import SlidingCounter from '../components/SlidingCounter';
import { defaultColors } from '../contexts/ThemeContext';

const { height, width } = Dimensions.get('window');

const MindMeld = () => {
  const [count, setCount] = useState(1);
  const [chess, setChess] = useState<Chess>(setupBoard(count));
  const [mmSquare, setMMSquare] = useState(nextMindMeldSquare(chess.fen()));
  const [showPieces, setShowPieces] = useState(false);
  const chessboardRef = useRef<ChessboardRef>(null);

  // reset the board and get a new position
  const resetBoard = useCallback(() => {
    const newBoard = setupBoard(count);
    setChess(newBoard);
    chessboardRef.current?.resetBoard(newBoard.fen());
    const sq = nextMindMeldSquare(newBoard.fen());
    setMMSquare(sq);
    chessboardRef.current?.resetAllHighlightedSquares();
    chessboardRef.current?.highlight({
      square: sq,
    });
  }, [count]);

  //toast
  const [showAnimation, setShowAnimation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  useEffect(() => {
    if (showAnimation === true) {
      const timeout = setTimeout(() => {
        resetBoard();
        setShowAnimation(false);
      }, 2250);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCorrect, showAnimation]);

  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />

        <Chessboard
          fen={chess.fen()}
          ref={chessboardRef}
          onMove={({ state }) => {
            if (
              (state.history.slice(-1)[0] as Move).flags === 'c' ||
              (state.history.slice(-1)[0] as Move).to !== mmSquare
            ) {
              chessboardRef.current?.undo();
              setIsCorrect(false);
              setShowAnimation(true);
            } else {
              chessboardRef.current?.resetAllHighlightedSquares();
              chessboardRef.current?.highlight({
                square: (() => {
                  const next = nextMindMeldSquare(state.fen);
                  setChess(new Chess(state.fen));
                  setMMSquare(next);
                  return next;
                })(),
              });
            }
          }}
          blindfold={showPieces}
        />
   
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <AnimatedTouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowPieces((prev) => !prev);
            chessboardRef.current?.resetAllHighlightedSquares();
            chessboardRef.current?.highlight({
              square: mmSquare,
            });
          }}
        >
          <AnimatedText>Show / Hide Pieces</AnimatedText>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity style={styles.button} onPress={resetBoard}>
          <AnimatedText>New Board</AnimatedText>
        </AnimatedTouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center'}}>
        <AnimatedView
          customColors={{
            light: defaultColors.light.pressable,
            dark: defaultColors.dark.pressable,
          }}
          style={styles.sliderButton}
        >
          <AnimatedText>Pieces per Side</AnimatedText>
          <SlidingCounter
            defaultValue={1}
            minValue={1}
            maxValue={3}
            count={count}
            setCount={setCount}
          />
        </AnimatedView>
        </View>
     
      {showAnimation && (
        <Toast
          isCorrect={isCorrect}
          correctMessage='Good Work!'
          incorrectMessage='Wrong! Board has been reset.'
        />
      )}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 175,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  sliderButton: {
    height: 120,
    width: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
});

export default MindMeld;
