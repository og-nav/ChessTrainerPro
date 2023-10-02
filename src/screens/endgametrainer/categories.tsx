import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import data from '../../assets/endgames.json';
import Navbar from '../../components/Navbar';
import AnimatedView from '../../components/AnimatedView';
import CategoriesCard from '../../components/CategoriesCard';
import {
  DrawerParamList,
  EndgameNavigatorParamList,
} from '../../navigation/types';

type CategoriesProp = CompositeScreenProps<
  NativeStackScreenProps<EndgameNavigatorParamList, 'Categories'>,
  DrawerScreenProps<DrawerParamList>
>;

const Categories = ({ navigation }: CategoriesProp) => {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <View style={styles.container}>
        {data.categories.map((c, i) => (
          <CategoriesCard
            icons={c.icons}
            name={c.name}
            id={`categoriescard${i}`}
            key={`categoriescard${i}`}
            onPress={() =>
              navigation.navigate('Subcategories', {
                subcategories: c.subcategories,
              })
            }
          />
        ))}
      </View>
    </AnimatedView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
});
