import React from 'react';
import { ActivityIndicator, Dimensions, View, StyleSheet } from 'react-native';
import { Colors } from '@app/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@app/store';

type LoaderProps = {
  visible?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ visible = false }) => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  return visible ? (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors.black[theme],
        },
      ]}
    >
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={Colors.white[theme]} />
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',

    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderBox: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default Loader;
