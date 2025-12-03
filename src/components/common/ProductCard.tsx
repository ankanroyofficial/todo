import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import { normalize } from '@app/utils/orientation';
import { PRODUCT_TYPE, TODO_TYPE } from '@app/types';
import { Colors, Icons } from '@app/themes';
import AddEditToDoModal from './AddEditToDoModal';
import { useAppSelector } from '@app/store';
import { navigate } from '@app/navigation/RootNaivgation';

interface ProductCard_TYPE {
  productDetails: PRODUCT_TYPE;
  productIndex: number;
}

const ProductCard: FC<ProductCard_TYPE> = ({
  productDetails,
  productIndex,
}) => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  return (
    <TouchableOpacity
      key={productIndex}
      onPress={() =>
        navigate('ProductDetails', { productDetails: productDetails })
      }
      style={[
        styles.itemContainer,
        {
          backgroundColor: Colors.cardColor[theme],
        },
      ]}
    >
      <View style={[styles.ProductImage]}>
        <Image
          source={{ uri: productDetails?.image }}
          style={styles.dotsIcon}
        />
      </View>

      <View style={{ flex: 1, paddingLeft: normalize(10) }}>
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          {productDetails?.title}
        </Text>

        <Text style={[styles.optionTitle]}>
          Price:{' '}
          <Text style={{ fontSize: normalize(11), color: Colors.black[theme] }}>
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
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  ProductImage: {
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(8),
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsIcon: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
  },
  itemContainer: {
    padding: normalize(13),
    marginBottom: normalize(8),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },

  optionTitle: {
    fontSize: normalize(11),
    fontWeight: '500',
    color: 'gray',
    marginBottom: normalize(1),
  },
});
