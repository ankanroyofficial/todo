import React, { FC, useEffect, useState } from 'react';
import {
  View,
  TextInput as Input,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import { horizontalScale, moderateScale, normalize } from '@utils/orientation';
import { Colors, Icons } from '@app/themes';
import { hexToRGB } from '@app/utils/helpers';
import { isIos } from '@app/utils/helpers/Validation';
import { useAppSelector } from '@app/store';

interface TextInputProps {
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  placeholder?: string;
  editable?: boolean;
  width?: string | number;
  height?: number;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  maxLength?: number;
  marginVertical?: number;
  rightIcon?: number;
  iconStyle?: ImageStyle;
  onRightIconPress?: () => void;
}

const TextInput: FC<TextInputProps> = ({
  value,
  onChangeText = () => {},
  keyboardType = 'default',
  secureTextEntry = false,
  placeholder = '',
  editable = true,
  width = '95%',
  height = normalize(50),
  textAlign = 'left',
  fontSize = normalize(14),
  maxLength,
  marginVertical = moderateScale(7),
  rightIcon,
  iconStyle,
  onRightIconPress,
}) => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const containerStyle: StyleProp<ViewStyle | any> = {
    width: typeof width === 'number' ? width : `${width}`,
    height,
    backgroundColor: Colors.white[theme],
    marginVertical,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: hexToRGB(Colors.black[theme], isIos() ? 0.09 : 0.8),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
  };

  return (
    <View style={containerStyle}>
      <Input
        value={value}
        editable={editable}
        maxLength={maxLength}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        placeholderTextColor={Colors.black[theme]}
        keyboardType={keyboardType}
        style={[styles.input, { textAlign, fontSize, color: Colors.black[theme] }]}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.iconWrapper}
        >
          <Image
            source={isSecure ? Icons.hide : Icons.show}
            style={[styles.icon, { tintColor: Colors.black[theme] }, iconStyle]}
          />
        </TouchableOpacity>
      )}
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconWrapper}>
          <Image
            source={rightIcon}
            style={[styles.icon, { tintColor: Colors.black[theme] }, iconStyle]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(10),
  },
  icon: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
  },
});
