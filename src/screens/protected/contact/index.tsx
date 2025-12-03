import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { Colors } from '@app/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@app/store';
import { PRODUCT_TYPE } from '@app/types';
import ProductCard from '@app/components/common/ProductCard';
import TextInput from '@app/components/common/TextInput';
import { normalize } from '@app/utils/orientation';
import Button from '@app/components/common/Button';
import { showMessage } from '@app/utils/helpers/Toast';
import { validateEmail } from '@app/utils/helpers/Validation';

const Contact = () => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const renderItm = ({
    item,
    index,
  }: {
    item: PRODUCT_TYPE;
    index: number;
  }) => <ProductCard productDetails={item} productIndex={index} />;

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dec, setdec] = useState('');

  const re = /^\d{10}$/;

  const submitBUttonHandle = async () => {
    try {
      Keyboard.dismiss();
      if (userName.trim() == '') {
        showMessage('Please enter user name');
        return;
      }
      if (!validateEmail(email)) {
        showMessage('Please enter valid email');
        return;
      }
      if (!re.test(phone)) {
        showMessage('Please enter 10 digit valid phone number');
        return;
      }
      if (dec.trim() == '') {
        showMessage('Please enter reason');
        return;
      }

      setUserName('');
      setEmail('');
      setPhone('');
      setdec('');
      Alert.alert(
        'Feedback',
        'Sended Sucessfully',
        [
          {
            text: 'OK',
            style: 'destructive',
            onPress: () => null,
          },
        ],
        { cancelable: true },
      );
    } catch (error) {
      console.error('submitBUttonHandle>>>', error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors.white[theme]
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            {
              color: 'black',
            },
          ]}
        >
          Contact Us
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(10),
          alignItems: 'center',
        }}
      >
        <TextInput
          placeholder="Name"
          value={userName}
          onChangeText={value => setUserName(value)}
          keyboardType="email-address"
        />{' '}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={value => setPhone(value)}
          keyboardType="email-address"
          maxLength={10}
        />
        <TextInput
          placeholder="Reason"
          value={dec}
          onChangeText={value => setdec(value)}
          keyboardType="email-address"
        />
        <Button
          title="Submit"
          onPress={submitBUttonHandle}
          style={{ backgroundColor: Colors.black[theme] }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Contact;
