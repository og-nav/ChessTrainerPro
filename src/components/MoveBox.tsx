import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { AnimatedView, AnimatedText } from '../components';
import { pieceSetExports } from '../util';
import { ThemeContext, primary } from '../contexts/ThemeContext';
import { BlindfoldChessContext } from '../contexts/BlindfoldChessContext';

interface MoveBoxProps {
  color: 'w' | 'b';
  piece: string;
  square: string;
}

const MoveBox: React.FC<MoveBoxProps> = ({ color, piece, square }) => {
  const { theme } = useContext(ThemeContext);
  const { gameHistory } = useContext(BlindfoldChessContext);
  const currMove = gameHistory.length / 2 + 1;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {gameHistory.length % 2 === 0 && color === 'w'
        ? null //{/*<AnimatedText>{currMove}.</AnimatedText>*/}
        : null}
      <AnimatedView
        style={{
          borderRadius: 10,
          borderWidth: 3,
          borderColor: 'black',
          height: 60,
          width: 100,
          margin: 4,
        }}
        customColors={{
          light: primary[200],
          dark: primary[500],
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={
              pieceSetExports[
                `${color}${piece}` as keyof typeof pieceSetExports
              ].source
            }
            alt={
              pieceSetExports[
                `${color}${piece}` as keyof typeof pieceSetExports
              ].alt
            }
            resizeMode="contain"
            style={{ justifyContent: 'flex-start', height: 40, width: 40 }}
          />
          <AnimatedText
            style={{
              fontSize: 20,
            }}>
            {square}
          </AnimatedText>
        </View>
      </AnimatedView>
    </View>
  );
};

export default MoveBox;
