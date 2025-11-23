import React from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { normalize } from '@app/utils/orientation';
import { Colors } from '@app/themes';
import { useAppSelector } from '@app/store';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const {
    title,
    onPress = () => {},
    isLoading = false,
    style,
    disabled = false,
    textStyle,
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: Colors.black[theme],
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.white[theme]} />
      ) : (
        <Text
          style={[
            styles.title,
            {
              color: Colors.white[theme],
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: normalize(42),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: normalize(8),
    marginTop: normalize(10),
  },
  title: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
});

export default Button;
