import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Navbar from '../../components/Navbar';
import {
  AnimatedText,
  AnimatedView,
  BackButton,
  Toast,
} from '../../components';
import {
  EndgameNavigatorParamList,
  DrawerParamList,
} from '../../navigation/types';
import LichessButton from '../../components/LichessButton';
import Chessboard, { ChessboardRef } from '../../components/chessboard';
import BottomSheet, { BottomSheetRefProps } from '../../components/BottomSheet';
import { Chess } from 'chess.js';
//import { sharedTransition } from '../../components/TransitionAnimation';
const Na_Vinci = require('../../engine/Na_Vinci');
const Engine = new Na_Vinci();

type GameProp = CompositeScreenProps<
  NativeStackScreenProps<EndgameNavigatorParamList, 'Game'>,
  DrawerScreenProps<DrawerParamList>
>;

const { width, height } = Dimensions.get('window');

const Game = ({ route, navigation }: GameProp) => {
  const handlePressBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const { fen, target } = route.params;
  const chess = new Chess(fen);
  const [playerTurn] = useState(chess.turn());
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const chessboardRef = useRef<ChessboardRef>(null);
  const uri = `https://lichess.org/analysis/${fen}`;
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const onPressBottomSheet = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-200);
    }
  }, []);

  //toast
  const [showAnimation, setShowAnimation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  useEffect(() => {
    if (showAnimation === true) {
      const timeout = setTimeout(() => {
        if (isCorrect) {
          setGestureEnabled(false);
        }
        setShowAnimation(false);
      }, 2250);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isCorrect, showAnimation]);

  return (
    <AnimatedView
      style={{ flex: 1 }}
      safe={true}
      //sharedTransitionTag={fen}
      //sharedTransitionStyle={sharedTransition}
    >
      <Navbar />
      <BackButton onPress={handlePressBackButton} />
      <Chessboard
        gestureEnabled={gestureEnabled}
        fen={fen}
        ref={chessboardRef}
        onMove={async ({ state }) => {
          const currChess = new Chess(state.fen);
          /*if (currChess.turn() !== playerTurn) {
            const move = Engine.getBestMove(state.fen, 1).move;
            console.log(move);
            chessboardRef.current?.move({
              from: move.substring(0, 2),
              to: move.substring(2, 4),
            });
          }*/
        }}
        durations={{ move: 250 }}
      />
      <AnimatedText style={styles.objective}>Objective: {target}</AnimatedText>

      <View style={{ alignItems: 'center' }}>
        <LichessButton onPress={onPressBottomSheet} />
      </View>
      <BottomSheet ref={bottomSheetRef}>
        <WebView style={{ flex: 1 }} source={{ uri: uri }} />
      </BottomSheet>
      {showAnimation && (
        <Toast
          isCorrect={isCorrect}
          correctMessage="Good Work!"
          incorrectMessage="Try Again!"
        />
      )}
    </AnimatedView>
  );
};

export default Game;

const styles = StyleSheet.create({
  objective: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    //backgroundColor: primary[900],
  },
  modal: {
    height: (height * 7) / 8,
    width: width, // * 7 / 8,
    //flex: 1,
  },
});

/*
const func = async () => {
            'worklet';
            const newTemp = applyMoves(state.history as Move[], fen);
            const oldTemp = new Chess(fen);
            if (newTemp.turn() !== oldTemp.turn() && !newTemp.isGameOver()) {
              const res = await NaVinci.getBestMove(state.fen, 3);

              const move = res.move;
              await chessboardRef.current?.move({
                from: move.slice(0, 2),
                to: move.slice(2, 4),
              });
            }
            if (newTemp.isGameOver() || newTemp.isDraw()) {
              setShowAnimation(true);
              setGestureEnabled(false);
              if (
                (newTemp.isCheckmate() &&
                  target === 'checkmate' &&
                  newTemp.turn() !== oldTemp.turn()) ||
                (newTemp.isDraw() && target === 'draw') ||
                (newTemp.isThreefoldRepetition() && target === 'draw')
              ) {
                setIsCorrect(true);
              } else {
                setIsCorrect(false);
              }
            }
          };

          func();




*/

/*
  const position = new Chess(fen);
  //const [playerTurn] = useState(position.turn());
  const playerTurn = position.turn();
  const [currentTurn, setCurrentTurn] = useState(position.turn());
  useEffect(() => {
    if (currentTurn !== playerTurn) {
      //make move
      /*const func = async () => {
        const newTemp = applyMoves(
          chessboardRef.current!.getState.history as Move[],
          fen,
        );
        const oldTemp = new Chess(fen);
        if (newTemp.turn() !== oldTemp.turn() && !newTemp.isGameOver()) {
          const res = await NaVinci.getBestMove(state.fen, 3);

          const move = res.move;
          await chessboardRef.current?.move({
            from: move.slice(0, 2),
            to: move.slice(2, 4),
          });
        }
        if (newTemp.isGameOver() || newTemp.isDraw()) {
          setShowAnimation(true);
          setGestureEnabled(false);
          if (
            (newTemp.isCheckmate() &&
              target === 'checkmate' &&
              newTemp.turn() !== oldTemp.turn()) ||
            (newTemp.isDraw() && target === 'draw') ||
            (newTemp.isThreefoldRepetition() && target === 'draw')
          ) {
            setIsCorrect(true);
          } else {
            setIsCorrect(false);
          }
        }
      };
      func();
      console.log('computer move here');
    }
  }, [NaVinci, currentTurn, fen, playerTurn, target]);
  */
