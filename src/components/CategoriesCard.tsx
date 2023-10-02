import React from 'react';
import { View } from 'react-native';
import { AnimatedView, AnimatedPressable, AnimatedText } from './';
import { EndgameIcons } from '../util';
import { primary } from '../contexts/ThemeContext';

interface CategoriesCardProps {
  icons: string[];
  name: string;
  id: string;
  onPress: () => void;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({
  icons,
  name,
  id,
  onPress,
}) => {
  return (
    <AnimatedView
      key={`categoriescard${name}${id}`}
      style={{
        height: 180,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedPressable
        key={`categoriescardbutton${name}${id}`}
        style={{
          height: 140,
          width: 140,
          borderRadius: 15,
          borderWidth: 3,
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            {icons.map((t) => EndgameIcons[t as keyof typeof EndgameIcons])}
          </View>
          <AnimatedText
            style={{
              flex: 1,
              textAlign: 'center',
              justifyContent: 'space-around',
            }}
            customColors={{
              light: primary[100],
              dark: 'white',
            }}>
            {name}
          </AnimatedText>
        </View>
      </AnimatedPressable>
    </AnimatedView>
  );
};

export default CategoriesCard;
