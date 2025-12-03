import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './style';
import { Colors, Icons } from '@app/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@app/store';
import { PRODUCT_TYPE } from '@app/types';
import ProductCard from '@app/components/common/ProductCard';
import { goBack } from '@app/navigation/RootNaivgation';

const WishList = () => {
  const wishList = useAppSelector(state => state.todo.wishList);
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const renderItm = ({
    item,
    index,
  }: {
    item: PRODUCT_TYPE;
    index: number;
  }) => <ProductCard productDetails={item} productIndex={index} />;
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
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Icons.close}
            style={[styles.icon, { tintColor: 'red' }]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            {
              color: Colors.black[theme]
            },
          ]}
        >
          WishList
        </Text>
      </View>

      {/* FlatListI */}
      <FlatList
        data={wishList}
        renderItem={renderItm}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default WishList;
