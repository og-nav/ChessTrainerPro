import React, { useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  AnimatedText,
  AnimatedTouchableOpacity,
  AnimatedView,
} from '../../components';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, signInAnonymously } from 'firebase/auth';

type NavigationProps = NativeStackNavigationProp<AuthenticationParamList>;
const { height } = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation<NavigationProps>();

  const handlePressSignUp = useCallback(() => {
    navigation.navigate('Sign Up');
  }, [navigation]);

  const handlePressSignIn = useCallback(() => {
    navigation.navigate('Sign In');
  }, [navigation]);

  const handlePressGuest = useCallback(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('signed in');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [navigation]);

  return (
    <AnimatedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      safe={true}>
      <AnimatedView style={styles.viewContainer}>
        <AnimatedText>Welcome</AnimatedText>

        <AnimatedTouchableOpacity
          style={styles.signButton}
          onPress={handlePressSignUp}>
          <AnimatedText>Sign Up</AnimatedText>
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={styles.signButton}
          onPress={handlePressSignIn}>
          <AnimatedText>Sign In</AnimatedText>
        </AnimatedTouchableOpacity>

        <AnimatedText style={styles.guestText} onPress={handlePressGuest}>
          continue as guest
        </AnimatedText>
      </AnimatedView>
    </AnimatedView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height / 5,
  },
  signButton: {
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  guestText: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
