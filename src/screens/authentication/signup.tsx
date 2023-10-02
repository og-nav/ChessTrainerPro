import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AnimatedFeather, AnimatedText, AnimatedView } from '../../components';
import { primary } from '../../contexts/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthenticationParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';

/*GoogleSignin.configure({
	webClientId: '227323976326-br1sibu2fkhdvbngueq1cmgv9gpks2bm.apps.googleusercontent.com',
	offlineAccess: true,
})*/
const { height, width } = Dimensions.get('window');
type NavigationProps = NativeStackNavigationProp<AuthenticationParamList>;

const SignUp = () => {
  const auth = getAuth();
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });
  const navigation = useNavigation<NavigationProps>();
  const handlePressBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });

      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password,
      ).then((userCredentials) => {
        //setDisplayName(userCredentials.user.displayName)
      });
      console.log('success');
    } catch (error) {
      setValue({
        ...value,
        error: (error as any).message,
      });
    }
  }

  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <AnimatedView style={{ alignItems: 'flex-start', marginBottom: 4 }}>
            <AnimatedFeather
              onPress={handlePressBackButton}
              name={'chevron-left'}
              size={30}
              customColors={{
                light: primary[900],
                dark: 'white',
              }}
              customBackgroundColors={{
                light: 'white',
                dark: primary[900],
              }}
              style={{ marginBottom: 8, marginLeft: 16 }}
            />
          </AnimatedView>
          <AnimatedView
            style={styles.thinLine}
            customColors={{
              light: primary[100],
              dark: primary[100],
            }}
          />
          <AnimatedText style={styles.signUpText}>Sign Up</AnimatedText>
          <KeyboardAvoidingView
            style={styles.keyboardViewContainer}
            behavior="padding">
            <AnimatedView style={{ width: '80%' }}>
              <TextInput
                placeholder="Email"
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                style={styles.input}
              />
            </AnimatedView>
          </KeyboardAvoidingView>
          <AnimatedView style={{ flex: 1, alignItems: 'center' }}>
            <AnimatedText>or</AnimatedText>
          </AnimatedView>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.googleButton}>
              <Image
                style={styles.googleIcon}
                source={{
                  uri: 'https://i.ibb.co/j82DCcR/search.png',
                }}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AnimatedView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signUpText: {
    fontSize: 35,
    margin: 15,
  },
  thinLine: {
    height: 0.5,
    width: width,
    marginBottom: 4,
  },
  keyboardViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  googleButton: {
    width: (width * 5.5) / 8,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
});
