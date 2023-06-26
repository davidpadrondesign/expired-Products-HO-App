import { configureStore } from '@reduxjs/toolkit';
import listProductsReducer from './listProductsSlice';
import userRegisterReducer from './userRegisterSlice';
import userLoginReducer from './userLoginSlice';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
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
    key: 'root', //object name in Local Storage
    storage, //se lo pasamos como atributo. Es un controlador que se encargara de almacenar la info en el Local Storage
    whitelist: ['usersLogin'], //atributo que indica los reducer especificos a guardar en el Locar Storage (sino se lo indicas por default te guarda todos los reducers)
}

const rootReducer = combineReducers({
    listproducts: listProductsReducer,
    usersRegister: userRegisterReducer,
    usersLogin: userLoginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ //mandamos el store al main.jsx
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //Working with Non-Serializable Data. https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      },
    }),

});

