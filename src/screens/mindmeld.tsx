import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chess, Move } from 'chess.js';
import Navbar from '../components/Navbar';
import {
  AnimatedView,
  AnimatedText,
  AnimatedTouchableOpacity,
} from '../components';
import { nextMindMeldSquare, setupBoard } from '../util';
import Chessboard, { ChessboardRef } from '../components/chessboard';
import SlidingCounter from '../components/SlidingCounter';
import { defaultColors } from '../contexts/ThemeContext';

const MindMeld = () => {
  const [count, setCount] = useState(1);
  const [chess, setChess] = useState<Chess>(setupBoard(count));
  const [mmSquare, setMMSquare] = useState(nextMindMeldSquare(chess.fen()));
  const [showPieces, setShowPieces] = useState(false);
  const chessboardRef = useRef<ChessboardRef>(null);

  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <Chessboard
        fen={chess.fen()}
        ref={chessboardRef}
        onMove={({ state }) => {
          if ((state.history.slice(-1)[0] as Move).flags === 'c') {
            chessboardRef.current?.undo();
          }
          chessboardRef.current?.resetAllHighlightedSquares();
          chessboardRef.current?.highlight({
            square: (() => {
              const next = nextMindMeldSquare(state.fen);
              setChess(new Chess(state.fen));
              setMMSquare(next);
              return next;
            })(),
          });
        }}
        blindfold={showPieces}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
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

        <AnimatedTouchableOpacity
          style={styles.button}
          onPress={() => {
            const newBoard = setupBoard(count);
            setChess(newBoard);
            chessboardRef.current?.resetBoard(newBoard.fen());
            chessboardRef.current?.resetAllHighlightedSquares();
            chessboardRef.current?.highlight({
              square: nextMindMeldSquare(chessboardRef.current?.getState().fen),
            });
          }}
        >
          <AnimatedText>New Board</AnimatedText>
        </AnimatedTouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
            maxValue={5}
            count={count}
            setCount={setCount}
          />
        </AnimatedView>
      </View>
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
    height: 170,
    width: 250,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
});

export default MindMeld;
