import React from 'react';
import { useWindowDimensions, View } from 'react-native';
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
  const { height } = useWindowDimensions();
  return (
    <AnimatedView
      key={`categoriescard${name}${id}`}
      style={{
        height: height / 6,
        width: height / 6,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedPressable
        key={`categoriescardbutton${name}${id}`}
        style={{
          height: height / 6,
          width: height / 6,
          borderRadius: 15,
          borderWidth: 2,
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
              fontSize: height / 50,
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
