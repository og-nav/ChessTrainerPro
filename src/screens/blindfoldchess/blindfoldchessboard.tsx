import React, { useContext, useEffect, useRef, useState } from 'react';
import AnimatedView from '../../components/AnimatedView';
import { BlindfoldChessContext } from '../../contexts/BlindfoldChessContext';
import Chessboard, { ChessboardRef } from '../../components/chessboard';
import { Chess, Move } from 'chess.js';
import { applyMoves } from '../../util';

const BlindfoldChessBoard = () => {
  const { gameHistory, playAsBlack, blindfoldChessboardRef } = useContext(
    BlindfoldChessContext
  );
  const chessboardRef = useRef<ChessboardRef>(null);
  const [currentFen, setCurrentFen] = useState('');
  useEffect(() => {
    (async () => {
      const hist = gameHistory; //blindfoldChessboardRef?.current?.getState().history;
      console.log(hist);

      if (hist && hist.length > 0) {
        const pos = applyMoves(hist as Move[]); //new Chess(chessboardRef.current?.getState().fen);
        const firstMove = hist.slice(-2)[0] as Move;
        const secondMove = hist.slice(-1)[0] as Move;

        let moves = pos.moves({ verbose: true });

        if (moves.some((move) => move.san === firstMove.san)) {
          await chessboardRef.current?.move({
            from: (hist.slice(-2)[0] as Move).from,
            to: (hist.slice(-2)[0] as Move).to,
          });
          pos.move(firstMove);
        }
        moves = pos.moves({ verbose: true });
        if (moves.some((move) => move.san === secondMove.san)) {
          await chessboardRef.current?.move({
            from: (hist.slice(-1)[0] as Move).from,
            to: (hist.slice(-1)[0] as Move).to,
          });
          pos.move(secondMove);
        }
        setCurrentFen(pos.fen());
      }

      if (hist && hist.length === 0) {
        chessboardRef?.current?.resetBoard();
      }
    })();
  }, [blindfoldChessboardRef, currentFen]);
  return (
    <AnimatedView style={{ flex: 1, marginTop: 12  }} safe={true}>
      <Chessboard
        ref={chessboardRef}
        gestureEnabled={false}
        hapticsEnabled={false}
        soundEnabled={false}
        playerColor={playAsBlack ? 'b' : 'w'}
      />
    </AnimatedView>
  );
};

export default BlindfoldChessBoard;
