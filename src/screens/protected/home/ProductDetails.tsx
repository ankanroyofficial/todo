import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Icons } from '@app/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@app/store';
import { normalize } from '@app/utils/orientation';
import { goBack } from '@app/navigation/RootNaivgation';
import { storeWishListData } from '@app/store/slice/todo.slice';
import styles from './style';

const ProductDetails = (props: any) => {
  const dispatch = useAppDispatch();
  const { productDetails } = props.route.params;
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const wishList = useAppSelector(state => state.todo.wishList);
  const theme = isDarkTheme ? 'dark' : 'light';

  const isAlreadySaved = () => {
    try {
      return wishList.some(item => item.id === productDetails?.id);
    } catch (error) {
      return false;
      console.error('isAlreadySaved err>>', error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors.white[theme],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image source={Icons.close} style={styles.icon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          Product
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(storeWishListData(productDetails));
          }}
        >
          <Image
            source={isAlreadySaved() ? Icons.save : Icons.unsave}
            style={[styles.icon, { tintColor: Colors.black[theme] }]}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: normalize(20),
            backgroundColor: Colors.cardColor[theme],
            width: '90%',
            alignSelf: 'center',
            borderRadius: normalize(15),
          }}
        >
          <View style={styles.productDetailsImage}>
            <Image
              source={{ uri: productDetails.image }}
              style={styles.image}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: normalize(20) }}>
            <Text
              style={[
                styles.itemText,
                {
                  color: Colors.black[theme],
                  width: normalize(250),
                  textAlign: 'center',
                  marginBottom: normalize(5),
                  fontWeight: '500',
                },
              ]}
            >
              {productDetails?.title}
            </Text>

            <Text style={[styles.optionTitle]}>
              Price:{' '}
              <Text
                style={{
                  fontSize: normalize(11),
                  color: Colors.black[theme],
                }}
              >
                {productDetails?.price}
              </Text>
            </Text>
            <Text style={[styles.optionTitle]}>
              Category:{' '}
              <Text
                style={{
                  fontSize: normalize(11),
                  color: Colors.black[theme],
                  textTransform: 'capitalize',
                }}
              >
                {productDetails?.category}
              </Text>
            </Text>

            <Text
              style={[
                styles.itemText,
                {
                  color: Colors.black[theme],
                },
              ]}
            >
              ⭐ {productDetails?.rating?.rate}{' '}
              <Text style={{ fontSize: normalize(10), color: 'gray' }}>
                ({productDetails?.rating?.count})
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* FlatList */}
    </SafeAreaView>
  );
};

export default ProductDetails;
