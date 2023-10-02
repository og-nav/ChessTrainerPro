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
  const { width } = useWindowDimensions();
  return (
    <AnimatedView
      key={`categoriescard${name}${id}`}
      style={{
        height: width / 5,
        width: width / 5,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedPressable
        key={`categoriescardbutton${name}${id}`}
        style={{
          height: width / 5,
          width: width / 5,
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
              fontSize: width / 40,
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
