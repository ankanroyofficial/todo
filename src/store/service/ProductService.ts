import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
const getProductList = async () => {
  try {
    const result = await axios.get(
      'https://fakestoreapi.com/products',
    ); 
    console.log('result -- ', result);
    return {
      success: '',
      message: 'Profile fetched successfully',
    };
  } catch (error: any) {
    return {
      success: '',
      message: 'Profile fetched successfully',
    };
  }
};

export { getProductList };
