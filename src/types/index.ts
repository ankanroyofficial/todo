export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
};

// -------------------------- API PROPS ----------------------------------
export interface SIGN_UP_TYPE {
  email: string;
  password: string;
}

export interface SIGN_IN_TYPE {
  email: string;
  password: string;
}

export interface TODO_TYPE {
  key: string;
  id: number;
  task: string;
  isCompleted: boolean;
  isDeleted: boolean;
}
