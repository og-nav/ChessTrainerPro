import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Chess } from '../chessboard/chess';
import Background from './Background';
import Piece from './Piece';

const { width } = Dimensions.get('window');

interface DisplayBoardProps {
  boardSize?: number;
  fen: string;
  //notationEnabled?: boolean
}

const DisplayBoard: React.FC<DisplayBoardProps> = ({
  boardSize = width,
  fen,
}) => {
  const [chess, _setChess] = useState(new Chess(fen));

  return (
    <View style={{ width: boardSize, height: boardSize }}>
      <Background />
      {chess.board().map((row, i) =>
        row.map((square, j) => {
          if (square === null) {
            return null;
          }
          return (
            <Piece
              key={`${j}-${i}`}
              startPosition={{
                x: (j * boardSize) / 8,
                y: (i * boardSize) / 8,
              }}
              id={`${square.color}${square.type}` as const}
              pieceSize={boardSize / 8}
            />
          );
        }),
      )}
    </View>
  );
};

export default DisplayBoard;
