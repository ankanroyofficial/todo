import React, { useEffect, useState } from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '@app/types';
import { useAppSelector } from '@app/store';
import Splash from '@screens/public/auth/Splash';
import { navigationRef } from './RootNaivgation';
import Home from '@app/screens/protected/home';
import ProductDetails from '@app/screens/protected/home/ProductDetails';
import WishList from '@app/screens/protected/wishList';
import Contact from '@app/screens/protected/contact';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const userDetails = useAppSelector(state => state.auth.userDetails);

  // console.log(userDetails, '----------------------------->');

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // End splash after 1.5 seconds
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  const MainScreens = {
    Home: Home,
    ProductDetails: ProductDetails,
    WishList: WishList,
    Contact:Contact
  };
  const Screens = MainScreens;
  // const Screens = { ...AuthScreens, ...MainScreens };
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(Screens).map(([name, component], index) => (
          <Stack.Screen
            key={index}
            name={name as keyof RootStackParamList} // Casting the name to RootStackParamList keys
            component={
              component as React.ComponentType<
                StackScreenProps<RootStackParamList>
              >
            }
            options={{ gestureEnabled: true }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
