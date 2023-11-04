import React, { useCallback, useContext, useEffect, useState } from 'react';
import AnimatedView from '../../components/AnimatedView';
import { BlindfoldChessContext } from '../../contexts/BlindfoldChessContext';
import Chessboard from '../../components/chessboard';
import { Chess, Move } from 'chess.js';
import { applyMoves } from '../../util';
import { AnimatedText } from '../../components';
const Na_Vinci = require('../../engine/Na_Vinci');

const BlindfoldChessPlay = () => {
  const { blindfoldChessboardRef, setGameHistory, playAsBlack, gameHistory } =
    useContext(BlindfoldChessContext);
  const [NaVinci] = useState(new Na_Vinci());
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const playerTurn = playAsBlack ? 'b' : 'w';
  useEffect(() => {
    if (playAsBlack && gameHistory.length == 0) {
      const tempChess = new Chess();
      const move = NaVinci.getBestMove(tempChess.fen(), 1).move;
      blindfoldChessboardRef?.current?.move({
        from: move.substring(0, 2),
        to: move.substring(2, 4),
      });
      tempChess.move(move);
      setComputerThinking(false);
      const lastMove = tempChess.undo();
      const hist = tempChess.history() as unknown as Move[];
      if (lastMove) {
        hist.push(lastMove);
      }

      setGameHistory(hist);
    }
  }, [playAsBlack]);

  const getBestMove = useCallback(
    async (fen: string) => {
      const res = await NaVinci.getBestMove(fen, 2);
      const move = res.move;
      return move;
    },
    [NaVinci]
  );

  const playComputerMove = useCallback(async () => {
    const pos = new Chess(blindfoldChessboardRef?.current?.getState().fen);
    if (playAsBlack && gameHistory.length === 0) {
      // play computer move
      const move = await getBestMove(pos.fen());
      await blindfoldChessboardRef?.current?.move({
        from: move.slice(0, 2),
        to: move.slice(2, 4),
      });
      pos.move(move);
    }
    if (playAsBlack && pos.turn() === 'w' && !pos.isGameOver()) {
      // play computer move
      const move = await getBestMove(pos.fen());
      await blindfoldChessboardRef?.current?.move({
        from: move.slice(0, 2),
        to: move.slice(2, 4),
      });
      pos.move(move);
    } else if (!playAsBlack && pos.turn() === 'b' && !pos.isGameOver()) {
      // play computer move
      const move = await getBestMove(pos.fen());
      await blindfoldChessboardRef?.current?.move({
        from: move.slice(0, 2),
        to: move.slice(2, 4),
      });
      pos.move(move);
    }
    if (pos.isGameOver() || pos.isDraw() || pos.isThreefoldRepetition()) {
      setGestureEnabled(false);
    }
    const lastMove = pos.undo();

    const hist = blindfoldChessboardRef?.current?.getState().history as Move[];
    if (lastMove) {
      hist.push(lastMove);
    }
    setGameHistory(hist);
  }, [
    blindfoldChessboardRef,
    gameHistory,
    getBestMove,
    playAsBlack,
    setGameHistory,
  ]);

  const [computerThinking, setComputerThinking] = useState(false);
  useEffect(() => {
    if (computerThinking) {
      const tempChess = new Chess(
        blindfoldChessboardRef?.current?.getState().fen
      );
      //const tempChess = applyMoves(gameHistory);
      //console.log(tempChess.history());
      if (tempChess.turn() !== playerTurn && !tempChess.isGameOver()) {
        const move = NaVinci.getBestMove(tempChess.fen(), 1).move;
        blindfoldChessboardRef?.current?.move({
          from: move.substring(0, 2),
          to: move.substring(2, 4),
        });
        tempChess.move(move);
        setComputerThinking(false);
        const lastMove = tempChess.undo();
        const hist = tempChess.history() as unknown as Move[];
        if (lastMove) {
          hist.push(lastMove);
        }

        setGameHistory(hist);
      }
    }
  }, [computerThinking]);

  return (
    <AnimatedView style={{ flex: 1, marginTop: 12 }} safe={true}>
      <Chessboard
        gestureEnabled={gestureEnabled}
        blindfold={true}
        ref={blindfoldChessboardRef}
        durations={{ move: 250 }}
        playerColor={playAsBlack ? 'b' : 'w'}
        onMove={({ state }) => {
          const currChess = new Chess(state.fen);
          if (currChess.turn() !== playerTurn) {
            setComputerThinking(true);
          }
        }}
      />
      {computerThinking ? (
        <AnimatedText style={{fontSize: 17,
          textAlign: 'center',
          margin: 10,}}>
          Computer is thinking...
        </AnimatedText>
      ) : null}
    </AnimatedView>
  );
};

export default BlindfoldChessPlay;

/*
onMove={async ({ state }) => {
          const pos = new Chess(state.fen);
          if (playAsBlack && pos.turn() === 'w' && !pos.isGameOver()) {
            const move = await getBestMove(pos.fen());
            await blindfoldChessboardRef?.current?.move({
              from: move.slice(0, 2),
              to: move.slice(2, 4),
            });
            pos.move(move);
          }

          if (!playAsBlack && pos.turn() === 'b' && !pos.isGameOver()) {
            const move = await getBestMove(pos.fen());
            await blindfoldChessboardRef?.current?.move({
              from: move.slice(0, 2),
              to: move.slice(2, 4),
            });
            pos.move(move);
          }

          if (pos.isGameOver()) {
            setGestureEnabled(false);
          }
          const lastMove = pos.undo();

          const hist = state.history as Move[];
          if (lastMove) {
            hist.push(lastMove);
          }
          setGameHistory(hist);
        }}



        async ({ state }) => {
          const pos = applyMoves(state.history as Move[]);
          if (pos.isGameOver() || pos.isDraw() || pos.isThreefoldRepetition()) {
            setGestureEnabled(false);
            return;
          }
          if (
            (playAsBlack && pos.turn() === 'w') ||
            (!playAsBlack && pos.turn() === 'b')
          ) {
            const move = await getBestMove(pos.fen());
            await blindfoldChessboardRef?.current?.move({
              from: move.slice(0, 2),
              to: move.slice(2, 4),
            });
            pos.move(move);
          }

          const lastMove = pos.undo();
          const hist = state.history as Move[];
          if (lastMove) {
            hist.push(lastMove);
          }

          setGameHistory(hist);
        }



*/
