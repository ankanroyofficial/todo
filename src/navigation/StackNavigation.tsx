import React, { useEffect, useState } from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@app/types';
import { useAppSelector } from '@app/store';
import Splash from '@screens/public/auth/Splash';
import { navigationRef } from './RootNaivgation';

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

  const AuthScreens = {
    SignIn: {
      getComponent: () => require('@screens/public/auth/SignIn').default,
    },
    SignUp: {
      getComponent: () => require('@screens/public/auth/SignUp').default,
    },
  };

  const MainScreens = {
    Home: {
      getComponent: () => require('@screens/protected/home').default,
    },
  };
  const Screens = userDetails != null ? MainScreens : AuthScreens;
  // const Screens = { ...AuthScreens, ...MainScreens };
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(Screens).map(([name, component], index) => (
          <Stack.Screen
            key={index}
            name={name as keyof RootStackParamList}
            getComponent={component.getComponent}
            options={{ gestureEnabled: true }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
