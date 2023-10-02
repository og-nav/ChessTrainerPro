import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

interface LichessButtonProps {
  onPress: () => void; // specific lichess url
  //uri: string;
}

const LichessButton: React.FC<LichessButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.lichessButton}>
      <Image
        source={require('../assets/lichess.png')}
        resizeMode="contain"
        style={styles.lichessImage}
      />
      <Text style={styles.lichessText}>Open in Lichess</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lichessButton: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    height: 70,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    textAlignVertical: 'center',
    borderRadius: 10,
  },
  lichessImage: {
    height: 35,
    width: 35,
  },
  lichessText: {
    fontSize: 20,
    marginLeft: 12,
    color: 'white',
  },
});

export default LichessButton;
