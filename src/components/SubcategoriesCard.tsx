import React from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import { AnimatedView, AnimatedPressable, AnimatedText } from './';
import { subcategoryToIcons, pieceSetExports } from '../util';
import { primary } from '../contexts/ThemeContext';

interface SubcategoriesCardProps {
  name: string;
  id: string;
  onPress: () => void;
}

const SubcategoriesCard: React.FC<SubcategoriesCardProps> = ({
  name,
  id,
  onPress,
}) => {
  const icons = subcategoryToIcons(name);
  const { height } = useWindowDimensions();
  return (
    <AnimatedView
      key={`subcategoriescard${name}${id}`}
      style={{
        height: height / 6,
        width: height / 6,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
      }}
    >
      <AnimatedPressable
        key={`subcategoriescardbutton${name}${id}`}
        style={{
          height: height / 6,
          width: height / 6,
          borderRadius: 15,
          borderWidth: 2,
          padding: 4,
        }}
        onPress={onPress}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginBottom: 25,
              }}
            >
              {icons[0].map((t, i) => {
                const res = pieceSetExports[t as keyof typeof pieceSetExports];
                return (
                  <Image
                    source={res.source}
                    alt={res.alt}
                    resizeMode='contain'
                    key={`${res.alt} subcategories ${i}`}
                    style={{ height: height / 25, width: height / 25 }}
                  />
                );
              })}
            </View>
            {icons[1].length > 0 ? (
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 0,
                }}
              >
                {icons[1].map((t, i) => {
                  const res =
                    pieceSetExports[t as keyof typeof pieceSetExports];
                  return (
                    <Image
                      source={res.source}
                      alt={res.alt}
                      resizeMode='contain'
                      key={`${res.alt} subcategories ${i}`}
                      style={{ height: height / 45, width: height / 45 }}
                    />
                  );
                })}
              </View>
            ) : null}

            {icons[2].length > 0 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                {icons[2].map((t, i) => {
                  const res =
                    pieceSetExports[t as keyof typeof pieceSetExports];
                  return (
                    <Image
                      source={res.source}
                      alt={res.alt}
                      resizeMode='contain'
                      key={`${res.alt} subcategories ${i}`}
                      style={{ height: height / 25, width: height / 25 }}
                    />
                  );
                })}
              </View>
            ) : null}

            {/*icons.map((t, i) => {
							const res =
								pieceSetExports[
									t as keyof typeof pieceSetExports
								];
							if (res.alt === 'vs') {
								return (
									<Image
										source={res.source}
										alt={res.alt}
										resizeMode='contain'
										key={`${res.alt} subcategories ${i}`}
										style={{ height: 27, width: 27 }}
									/>
								);
							}
							return (
								<Image
									source={res.source}
									alt={res.alt}
									resizeMode='center'
									key={`${res.alt} subcategories ${i}`}
								/>
							);
						})*/}
          </View>
          <AnimatedText
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: height / 70,
              marginTop: 5
            }}
            customColors={{
              light: primary[100],
              dark: 'white',
            }}
          >
            {name}
          </AnimatedText>
        </View>
      </AnimatedPressable>
    </AnimatedView>
  );
};

export default SubcategoriesCard;
