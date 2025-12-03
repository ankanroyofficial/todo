import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Colors, Icons } from '@app/themes';
import { useAppDispatch, useAppSelector } from '@app/store';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCT_TYPE } from '@app/types';
import { navigate } from '@app/navigation/RootNaivgation';
import ProductCard from '@app/components/common/ProductCard';
import axios from 'axios';
import { storeProductListData } from '@app/store/slice/todo.slice';
import { storeTheme } from '@app/store/slice/auth.slice';
import { normalize } from '@app/utils/orientation';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(state => state.todo.productList);
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const [loader, setLoader] = useState<boolean>(false);
  const toggleSwitch = () => {
    dispatch(storeTheme(!isDarkTheme));
  };
  const getProduct = async () => {
    try {
      setLoader(true);
      let res = await axios.get('https://fakestoreapi.com/products'); 
      if (Array.isArray(res?.data)) { 
        dispatch(storeProductListData(res?.data));
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('getProduct>>>>>', error);
    }
  };
console.log("productList>>>>>>>>.",productList)
  useEffect(() => {
    getProduct();
  }, []);
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
          backgroundColor: Colors.white[theme],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          All Product
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigate('Contact');
          }}
        >
          <Image
            source={Icons.user}
            style={[
              styles.icon,
              {
                tintColor: Colors.black[theme],
                marginRight: normalize(8),
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate('WishList');
          }}
        >
          <Image
            source={Icons.wishlist}
            style={[
              styles.icon,
              {
                tintColor: Colors.black[theme],
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.themeContainer}>
        <Text
          style={{
            color: Colors.black[theme],
            fontWeight: '500',
          }}
        >
          Dark Theme
        </Text>
        <Switch
          trackColor={{
            false: Colors.gray[theme],
            true: Colors.gray[theme],
          }}
          ios_backgroundColor="green"
          onValueChange={toggleSwitch}
          value={isDarkTheme}
        />
      </View>

      {/* FlatList */}
      <FlatList
        data={productList}
        renderItem={renderItm}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />

      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={Colors.black[theme]} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
