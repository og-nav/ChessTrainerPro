import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RangeSliderComponent from './RangeSliderComponent';
import { defaultColors } from '../../contexts/ThemeContext';
import { AnimatedView, AnimatedText } from '../';

const RangeSlider = () => {
  const MIN_DEFAULT = 100;
  const MAX_DEFAULT = 3000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
  return (
    <View style={styles.container}>
      <AnimatedView
        customColors={{
          light: defaultColors.light.pressable,
          dark: defaultColors.dark.pressable,
        }}
        style={styles.contentContainer}>
        <View style={styles.content}>
          <AnimatedText style={styles.text}>Rating Range</AnimatedText>
          <RangeSliderComponent
            sliderWidth={300}
            min={MIN_DEFAULT}
            max={MAX_DEFAULT}
            step={10}
            onValueChange={(range: {
              min: React.SetStateAction<number>;
              max: React.SetStateAction<number>;
            }) => {
              setMinValue(range.min);
              setMaxValue(range.max);
            }}
          />
          <View style={styles.tableContainer}>
            <View style={{ marginBottom: 20 }}>
              <AnimatedText>Min Rating</AnimatedText>
              <View style={styles.table}>
                <AnimatedText>{minValue}</AnimatedText>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <AnimatedText>Max Rating</AnimatedText>
              <View style={styles.table}>
                <AnimatedText>{maxValue}</AnimatedText>
              </View>
            </View>
          </View>
        </View>
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '90%',
    height: 300,
    borderRadius: 25,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  tableContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  table: {
    borderColor: '#EBECF2',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});

export default RangeSlider;
