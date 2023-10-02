import React, { memo } from 'react';
import { View } from 'react-native';

//Chesscom Desktop Colors
const BLACK = '#b58863'; // change for global settings context
const WHITE = '#f0d9b5';

interface RowProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square: React.FC<SquareProps> = memo(({ row, col }) => {
  const backgroundColor = (col + row) % 2 === 0 ? WHITE : BLACK;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        padding: 4,
        justifyContent: 'space-between',
      }}
    />
  );
});

const Row: React.FC<RowProps> = memo(({ row }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {new Array(8).fill(0).map((_, col) => (
        <Square key={col} row={row} col={col} />
      ))}
    </View>
  );
});

const Background = memo(() => {
  return (
    <View style={{ flex: 1 }}>
      {new Array(8).fill(0).map((_, row) => (
        <Row key={row} row={row} />
      ))}
    </View>
  );
});

export default Background;
