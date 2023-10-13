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

/*
import {
  NativeModules,
  NativeEventEmitter,
  Pressable,
  Text,
} from 'react-native';
import { useEffect } from 'react';
console.log(NativeModules.Engine);
NativeModules.Engine.increment((value: string) => {
  console.log('the count is ' + value);
});
console.log(NativeModules.Engine.getConstants());
const engineEvents = new NativeEventEmitter(NativeModules.ChessEngine);*/

type CategoriesProp = CompositeScreenProps<
  NativeStackScreenProps<EndgameNavigatorParamList, 'Categories'>,
  DrawerScreenProps<DrawerParamList>
>;

const Categories = ({ navigation }: CategoriesProp) => {
  /*const decrement = async () => {
    try {
      var res = await NativeModules.Engine.decrement();
      console.log(res);
    } catch (e: any) {
      console.log(e.message, e.code);
    }
  };
  const increment = async () => {
    NativeModules.Engine.increment((res: any) => console.log(res));
  };

  useEffect(() => {
    engineEvents.addListener('onIncrement', (res) => {
      console.log('onIncrement', res);
    });

    engineEvents.addListener('onDecrement', (res) => {
      console.log('onDecrement', res);
    });

    return () => {
      engineEvents.removeAllListeners('onIncrement');
      engineEvents.removeAllListeners('onDecrement');
    };
  }, []);

  const getBestMove = async () => {
    try {
      var res = await NativeModules.ChessEngine.getEngineMove(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      );
      console.log(res);
    } catch (e: any) {
      console.log(e.message);
    }
    try {
      var res = await NativeModules.ChessEngine.getTestMove(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      );
      console.log(res);
    } catch {}
  };

  useEffect(() => {
    engineEvents.addListener('bestMove', (res) => {
      console.log('bstMove', res);
    });

    return () => {
      NativeModules.ChessEngine.stop();
      engineEvents.removeAllListeners('bestMove');
    };
  }, []);*/

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
