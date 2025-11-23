import { SIGN_IN_TYPE, SIGN_UP_TYPE } from '@app/types';
import Storage from '@app/utils/storage';
import { Dispatch } from 'redux';
import { resetAllData, storeUserData } from '../slice/auth.slice';
import { persistor } from '..';
import auth from '@react-native-firebase/auth';
import { authErrorHandle } from '@app/screens/public/auth/authFunctions';
import { replace, reset } from '@app/navigation/RootNaivgation';

const signUp = (payload: SIGN_UP_TYPE) => {
  return async (dispatch: Dispatch) => {
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        dispatch(storeUserData(res));
        replace('Home');
      })
      .catch(error => {
        authErrorHandle(error.code);
      });
  };
};

const signIn = (payload: SIGN_IN_TYPE) => {
  return async (dispatch: Dispatch) => {
    auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        dispatch(storeUserData(res?.user));
        replace('Home');
      })
      .catch(error => {
        authErrorHandle(error.code);
      });
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(resetAllData());
      auth().signOut();
      Storage.clearAll();
      // reset(0, 'SignIn');
      // Clear Redux Persist's persisted data
      await persistor.purge();
    } catch (error: any) {
      console.error('logout  error>>>>>', error);
    }
  };
};

export { signUp, signIn, logout }; 
