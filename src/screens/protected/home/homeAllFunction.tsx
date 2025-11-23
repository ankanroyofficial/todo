import { Alert } from 'react-native';
export const handleAlert = (
  title: string,
  subtitle: string,
  onPress: () => void,
) => {
  Alert.alert(
    title,
    subtitle,
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: title,
        style: 'destructive',
        onPress: onPress,
      },
    ],
    { cancelable: true },
  );
};
