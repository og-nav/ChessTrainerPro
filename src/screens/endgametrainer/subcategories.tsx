import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Navbar from '../../components/Navbar';
import { AnimatedView, BackButton } from '../../components';
import {
  EndgameNavigatorParamList,
  DrawerParamList,
} from '../../navigation/types';
import SubcategoriesCard from '../../components/SubcategoriesCard';

type SubcategoriesProp = CompositeScreenProps<
  NativeStackScreenProps<EndgameNavigatorParamList, 'Subcategories'>,
  DrawerScreenProps<DrawerParamList>
>;

const Subcategories = ({ route, navigation }: SubcategoriesProp) => {
  const subcategoriesData = route.params.subcategories;
  const handlePressBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        games: {
          fen: string;
          target: string;
        }[];
        name: string;
      };
    }) => (
      <SubcategoriesCard //icons={item.icons}
        name={item.name}
        id={item.name}
        onPress={() => {
          navigation.navigate('Positions', {
            games: item.games,
          });
        }}
      />
    ),

    [navigation],
  );
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <BackButton onPress={handlePressBackButton} />

      <FlatList
        data={subcategoriesData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      />
    </AnimatedView>
  );
};

export default Subcategories;

const styles = StyleSheet.create({
  gamesButton: {
    height: 150,
    width: 150,
    borderRadius: 20,
    borderWidth: 5,
    margin: 12,
  },
});
