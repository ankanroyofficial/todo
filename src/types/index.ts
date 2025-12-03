export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  WishList: undefined;
  ProductDetails: any;
  Contact:any
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
export interface PRODUCT_TYPE {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
