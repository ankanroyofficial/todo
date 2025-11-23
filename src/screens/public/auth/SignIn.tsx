import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import { navigate } from '@app/navigation/RootNaivgation';
import { normalize } from '@utils/orientation';
import { showMessage } from '@app/utils/helpers/Toast';
import { useAppDispatch, useAppSelector } from '@app/store';
import KeyboardAvoidingTemplate from '@app/components/template/KeyboardAvoidingTemplate';
import Loader from '@app/utils/helpers/Loader';
import { signIn } from '@app/store/service/AuthService';
import { Colors } from '@app/themes';
const SignInScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('anro@yopmail.com');
  const [password, setPassword] = useState('Test@123');
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    let isValid = true;
    if (!username) {
      showMessage('username is required.');
      isValid = false;
    } else if (!password) {
      showMessage('Password is required.');
      isValid = false;
    }

    return isValid;
  };
  async function handleOnpress() {
    try {
      if (!validateFields()) {
        return;
      }
      Keyboard.dismiss();
      setIsLoading(true);
      dispatch(
        signIn({
          email: username,
          password: password,
        }),
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error in onPressButton:', error);
    }
  }

  return (
    <KeyboardAvoidingTemplate>
      <Loader visible={isLoading} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.white[theme],
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          Login
        </Text>
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button disabled={isLoading} title="Sign In" onPress={handleOnpress} />
        <Text
          style={[
            styles.footerText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigate('SignUp')}>
            Sign Up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(10),

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(20),
    textAlign: 'center',
    marginBottom: normalize(20),
  },
  footerText: {
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: normalize(15),
  },
  link: {
    color: '#007BFF',
  },
});

export default SignInScreen;
