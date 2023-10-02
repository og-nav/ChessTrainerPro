import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

interface ToastProps {
  isCorrect: boolean;
  correctMessage?: string;
  incorrectMessage?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isCorrect,
  correctMessage,
  incorrectMessage,
}) => {
  return (
    <>
      {isCorrect ? (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[styles.toastContainer, styles.correctToastContainer]}>
          <Image
            source={require('../assets/toast/correct.png')}
            alt="Correct Toast"
            style={styles.toastIcon}
          />
          <Text style={[styles.toastText, styles.correctToastText]}>
            {correctMessage ? correctMessage : 'Correct!'}
          </Text>
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeInUp}
          exiting={FadeOutUp}
          style={[styles.toastContainer, styles.incorrectToastContainer]}>
          <Image
            source={require('../assets/toast/incorrect.png')}
            alt="Incorrect Toast"
            style={styles.toastIcon}
          />
          <Text style={[styles.toastText, styles.incorrectToastText]}>
            {incorrectMessage ? incorrectMessage : 'Wrong! Try Again.'}
          </Text>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    width: '90%',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 500,
  },
  toastText: {
    marginLeft: 14,
    fontSize: 16,
  },
  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  correctToastContainer: {
    backgroundColor: '#DEF1D7',
    borderColor: '#1F8722',
  },
  incorrectToastContainer: {
    backgroundColor: '#FAE1DB',
    borderColor: '#D9100A',
  },
  correctToastText: {
    color: '#1F8722',
  },
  incorrectToastText: {
    color: '#D9100A',
  },
});
export default Toast;

//IMPLEMENTATION IN ANOTHER COMPONENT
/*
	const [showAnimation, setShowAnimation] = useState(false);
	const [isCorrect, setIsCorrect] = useState(true);
  /////// SOME ACTION WHENVER THE TOAST STATE CHANGES
	const nextHand = useCallback(() => {
		resetDeck();
		dealHands();
	}, []);
  ////////// SOME ACTION WHENEVER THE TOAST STATE CHANGES
	useEffect(() => {
		if (showAnimation === true) {
			const timeout = setTimeout(() => {
				if (isCorrect) {
					nextHand();
				}
				setShowAnimation(false);
			}, 1750);
			return () => clearTimeout(timeout);
		}
	}, [showAnimation]);

	return (
		...
		{showToast && <Toast isCorrect={isCorrect} />}
	)
	*/
