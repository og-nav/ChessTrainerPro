import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import AnimatedText from '../../components/AnimatedText';
import AnimatedView from '../../components/AnimatedView';
import MoveBox from '../../components/MoveBox';
import { BlindfoldChessContext } from '../../contexts/BlindfoldChessContext';

//const { width } = Dimensions.get('window');
//const windowWidth = width;
//const gap = 12;
//const itemsPerRow = 3;
//const totalGapSize = (itemsPerRow - 1) * gap;
//const childWidth = (windowWidth - totalGapSize) / itemsPerRow;

const BlindfoldChessMoves = () => {
  const { gameHistory } = useContext(BlindfoldChessContext);

  return (
    <AnimatedView style={{ flex: 1, alignItems: 'center' }} safe={true}>
      <FlatList
        data={gameHistory}
        renderItem={({ item }) => (
          <MoveBox
            key={item.lan}
            piece={item.piece}
            color={item.color}
            square={item.to}
          />
        )}
        numColumns={2}
      />
    </AnimatedView>
  );
};

export default React.memo(BlindfoldChessMoves);
