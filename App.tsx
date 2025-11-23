import React, { useEffect } from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  getFcmToken,
  requestUserPermission,
  scheduleEvery5Hours,
} from './src/utils/helpers/pushnotification_helper';
const App = () => {
  // ------------------------Push notification--------------------------
  async function requestAndroidPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log('Notification permission granted.');
      // } else {
      //   console.log('Notification permission denied.');
      // }
    }
  }
  useEffect(() => {
    requestAndroidPermissions();
  }, []);

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);
  useEffect(() => {
    scheduleEvery5Hours('Time to check your tasks and create new ones.');
  }, []);
  return <StackNavigation />;
};

export default App;
