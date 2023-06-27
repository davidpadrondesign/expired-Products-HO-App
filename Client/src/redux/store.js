import { configureStore } from '@reduxjs/toolkit';
import listProductsReducer from './listProductsSlice';
import userRegisterReducer from './userRegisterSlice';
import userLoginReducer from './userLoginSlice';
import storage from 'redux-persist/lib/storage';
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root', 
    storage,
    whitelist: ['usersLogin'],
}

const rootReducer = combineReducers({
    listproducts: listProductsReducer,
    usersRegister: userRegisterReducer,
    usersLogin: userLoginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});

