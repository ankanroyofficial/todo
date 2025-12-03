import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth.slice';
import todoReducer from './slice/todo.slice';
import productReducer from './slice/product.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import Storage from '@app/utils/storage';
import { logger } from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  product: productReducer,
});

const persistConfig = {
  key: 'root',
  storage: Storage,
  whitelist: ['auth', 'todo','product'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true, // Ensure thunk middleware is enabled
    }).concat(logger),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor };
