import { Platform } from 'react-native';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
function isIos() {
  return Platform.OS === 'ios';
}

export { isIos, validateEmail };
