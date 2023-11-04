import React, { useCallback } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import Navbar from '../../components/Navbar';
import { AnimatedPressable, AnimatedView, BackButton } from '../../components';
import DisplayBoard from '../../components/displayboard/Displayboard';
import {
  DrawerParamList,
  EndgameNavigatorParamList,
} from '../../navigation/types';
import { sharedTransition } from '../../components/TransitionAnimation';

type PositionsProp = CompositeScreenProps<
  NativeStackScreenProps<EndgameNavigatorParamList, 'Positions'>,
  DrawerScreenProps<DrawerParamList>
>;

const Positions = ({ route, navigation }: PositionsProp) => {
  const { width } = useWindowDimensions();
  const positionsData = route.params.games;
  const handlePressBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        fen: string;
        target: string;
      };
    }) => (
      <AnimatedPressable
        style={{ height: width / 2.5, width: width / 2.5, margin: 12 }}
        key={item.fen}
        //sharedTransitionTag={item.fen}
        //sharedTransitionStyle={sharedTransition}
        onPress={() => {
          navigation.navigate('Game', {
            fen: item.fen,
            target: item.target,
          });
        }}
      >
        <DisplayBoard boardSize={width / 2.5} fen={item.fen} />
      </AnimatedPressable>
    ),
    [navigation]
  );
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <BackButton onPress={handlePressBackButton} />

      <FlatList
        data={positionsData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      />
    </AnimatedView>
  );
};

export default Positions;

const styles = StyleSheet.create({});
