import React from 'react';
import { Image, View } from 'react-native';
import { Vector } from '../chessboard/types';

type Player = 'b' | 'w';
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
const PIECES: Pieces = {
  br: require('../../assets/piecesets/standard/br.png'),
  bp: require('../../assets/piecesets/standard/bp.png'),
  bn: require('../../assets/piecesets/standard/bn.png'),
  bb: require('../../assets/piecesets/standard/bb.png'),
  bq: require('../../assets/piecesets/standard/bq.png'),
  bk: require('../../assets/piecesets/standard/bk.png'),
  wr: require('../../assets/piecesets/standard/wr.png'),
  wn: require('../../assets/piecesets/standard/wn.png'),
  wb: require('../../assets/piecesets/standard/wb.png'),
  wq: require('../../assets/piecesets/standard/wq.png'),
  wk: require('../../assets/piecesets/standard/wk.png'),
  wp: require('../../assets/piecesets/standard/wp.png'),
};

interface PieceProps {
  id: Piece;
  startPosition: Vector;
  pieceSize: number;
}

const Piece: React.FC<PieceProps> = ({ id, startPosition, pieceSize }) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: pieceSize,
        width: pieceSize,
        transform: [
          {
            translateX: startPosition.x,
          },
          {
            translateY: startPosition.y,
          },
        ],
      }}>
      <Image
        source={PIECES[id]}
        style={{ height: pieceSize, width: pieceSize }}
      />
    </View>
  );
};

export default Piece;
