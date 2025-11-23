import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Keyboard } from 'react-native';
import Button from '@components/common/Button';
import TextInput from '@components/common/TextInput';
import { normalize } from '@app/utils/orientation';
import { showMessage } from '@app/utils/helpers/Toast';
import { validateEmail } from '@app/utils/helpers/Validation';
import { useAppDispatch, useAppSelector } from '@app/store';
import KeyboardAvoidingTemplate from '@app/components/template/KeyboardAvoidingTemplate';
import { signUp } from '@app/store/service/AuthService';

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState<SignUpProps>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateValue = (field: keyof SignUpProps, value: boolean | string) => {
    setInfo(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const validateFields = () => {
    let isValid = true;
    if (info.email == '') {
      showMessage('Email is required');
      isValid = false;
    } else if (!validateEmail(info.email)) {
      showMessage('Please enter a valid email address');
      isValid = false;
    } else if (info.password == '') {
      showMessage('Password is required.');
      isValid = false;
    } else if (info.password?.length < 6) {
      showMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else if (info.confirmPassword == '') {
      showMessage('Confirm Password is required.');
      isValid = false;
    } else if (info.password !== info.confirmPassword) {
      showMessage('Passwords do not match.');
      isValid = false;
    }
    return isValid;
  };

  async function onPressButton() {
    if (!validateFields()) {
      return;
    }
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      dispatch(
        signUp({
          email: info.email,
          password: info.password,
        }),
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error in onPressButton:', error);
    }
  }

  return (
    <KeyboardAvoidingTemplate>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Account</Text>
        <TextInput
          placeholder="Email"
          value={info.email}
          onChangeText={value => updateValue('email', value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={info.password}
          onChangeText={value => updateValue('password', value)}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={info.confirmPassword}
          onChangeText={value => updateValue('confirmPassword', value)}
          secureTextEntry
        />
        <Button disabled={isLoading} title="Sign Up" onPress={onPressButton} />
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign In
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(20),
    textAlign: 'center',
    marginBottom: normalize(8),
  },
  footerText: {
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: normalize(15),
    color: '#666',
  },
  link: {
    color: '#007BFF',
  },
});

export default SignUp;
