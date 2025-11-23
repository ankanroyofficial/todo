import { showMessage } from '@app/utils/helpers/Toast';
export const authErrorHandle = (res: string) => {
  switch (res) {
    case 'auth/invalid-credential':
      showMessage('Wrong credential');
      break;
    case 'auth/email-already-in-use':
      showMessage('This email is already used!');
      break;

    case 'auth/invalid-email':
      showMessage('Invalid email format');
      break;

    case 'auth/weak-password':
      showMessage('Password is too weak');
      break;

    default:
      showMessage('Something went wrong. Please try again.');
  }
};
