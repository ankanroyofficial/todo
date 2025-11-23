import messaging, {
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
} from '@react-native-firebase/messaging';
import notifee, { TriggerType } from '@notifee/react-native';
export async function requestUserPermission() {
  const messaging = getMessaging();

  const status = await messaging.requestPermission();

  const enabled =
    status === AuthorizationStatus.AUTHORIZED ||
    status === AuthorizationStatus.PROVISIONAL;

  return enabled;
}

export async function getFcmToken() {
  const messaging = getMessaging();
  const token = await getToken(messaging);
  console.log('FCM Token:', token);
  return token;
}

export function onForegroundMessage() {
  const messaging = getMessaging();
  onMessage(messaging, msg => {
    console.log('Foreground Message:', msg);
  });
}

export const requestNotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    // ||authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log(
        'requestNotificationPermission Notification Authorization status:',
        authStatus,
      );
    }
  } catch (error) {
    console.log('requestNotificationPermission>>>>', error);
  }
};
export const notificationListner = (token: string, dispatch: any) => {
  try {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification clicked:', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open:', remoteMessage);
        }
      });
    messaging().onMessage(async remoteMessage => {
      console.log('Notification when app open.....', { token }, remoteMessage);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
  } catch (error) {
    // console.log('notificationListner.....', error);
  }
};
export const getDeviceToken = async () => {
  return new Promise(async (resolve, reject) => {
    messaging()
      .getToken()
      .then(value => {
        if (value) {
          // console.log('Fire', value);
          resolve(value);
        } else {
          reject('Token could not be generated');
        }
      })
      .catch(error => {
        // console.error('getDeviceToken error>>>', error);
        reject('Token could not be generated');
      });
    // }
  });
};

export async function scheduleEvery5Hours(taskName: string) {
  const channelId = await notifee.createChannel({
    id: 'five-hour-reminder',
    name: 'Every 5 Hours Reminder',
  });

  await notifee.createTriggerNotification(
    {
      id: 'five-hour-task-id', // <--- prevents duplicates!
      title: 'Reminder',
      body: taskName,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    },
    {
      type: TriggerType.INTERVAL,
      interval: 5 * 60 * 60,

      //   type: TriggerType.TIMESTAMP,
      //   timestamp: Date.now() + 5000, // fire after 5 seconds
    },
  );
}
