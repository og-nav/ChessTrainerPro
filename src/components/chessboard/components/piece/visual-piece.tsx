import React from 'react';
import { ImageProps } from 'react-native';
import { PIECES } from '../../constants';
import { useChessboardProps } from '../../context/props-context/hooks';
import type { PieceType } from '../../types';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

type ChessPieceType = {
  id: PieceType;
} & Partial<ImageProps>;

const ChessPiece: React.FC<ChessPieceType> = React.memo(
  ({ id, ...rest }: ChessPieceType) => {
    const { pieceSize, renderPiece, blindfold } = useChessboardProps();

    const rStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(blindfold ? 0 : 1, { duration: 450 }),
      };
    });

    const sty = {
      width: pieceSize,
      height: pieceSize,
      ...rest,
    };

    return (
      renderPiece?.(id) ?? (
        <Animated.View style={rStyle} key={`${PIECES[id]}VIEW`}>
          <FastImage style={sty} source={PIECES[id]} key={PIECES[id]} />
        </Animated.View>
      )
    );
  },
);

export { ChessPiece };
