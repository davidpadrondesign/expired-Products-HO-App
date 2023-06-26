import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //'createAsyncThunk' is a function that return another function('getListProducts') whitch will call API and return a promise. Then this function 'getListProducts' we will use to dispatch in the UI components
import axios from "axios";

//THUNK - GET
export const getAllListProducts = createAsyncThunk( //'listProducts/getListProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'allListProducts/getListProducts',
    async (payload) => {
        const token = payload;
        console.log(`TOKEN -> ${token}`);

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: token, //send token for validation
            },
        };

        const response = await axios.get('http://localhost:4000/api/listProducts/allProducts', config);
        if(response.data) { //if response is good
            const allLisProducts = response.data; //'response.data' is already conveted to json
            console.log(allLisProducts);
            return { allLisProducts };//we return an object with API data to extraReducers
        }
    } 
);

//THUNK - POST
export const addProducts = createAsyncThunk( //'listProducts/getListProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'allListProducts/addProducts',
    async (payload) => {

        const dataNewProduct = {
            productName: payload.products.productName,
            productImage: payload.products.productImage,
            price: payload.products.price,
            expireTime: payload.products.expireTime,
            expireProductDate: { expireProductDay: payload.products.expire.day, expireProductMonth: payload.products.expire.month, expireProductYear: payload.products.expire.year },
            statusNumber: 1,
        }

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: payload.loginToken, //send token for validation
            },
        };

        const response = await axios.post('http://localhost:4000/api/listProducts/createProduct', {dataNewProduct}, config);
        if(response.data) { //if response is good
            const AddedProduct = response.data; //'response.data' is already conveted to json
            console.log(AddedProduct);
            return { AddedProduct };//we return an object with API data to extraReducers
        }
    } 
);

//THUNK - PUT
export const updateProducts = createAsyncThunk( //'updateProducts/addProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'updateProducts/addProducts',
    async (payload) => {
        console.log(payload);

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios.put(`http://localhost:4000/api/listProducts/updateProduct/${payload._id}`, payload, config); //simplemente mandamos la propiedad a actualizar '{deprecate: true}'
        if(response.data) { //if response is good
            const responseDB = response.data; //'response.data' is already conveted to json
            console.log(responseDB);
            //return { AddedProduct };//we return an object with API data to extraReducers
        }
    } 
);

//THUNK - PUT - SINGLE PRODUCT
export const updateSingleProduct = createAsyncThunk( //'updateProducts/addProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'updateSingleProduct/addProducts',
    async (payload) => {
        console.log(payload);

        const updateDataSingleProduct = {
            productName: payload.products.productName,
            productImage: payload.products.productImage,
            price: payload.products.price,
            expireProductDate: { expireProductDay: payload.products.expire.day, expireProductMonth: payload.products.expire.month, expireProductYear: payload.products.expire.year },
            expireTime: payload.products.expireTimeUpdate,
        }
        console.log(updateDataSingleProduct);

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: payload.loginToken, //send token for validation
            },
        };

        const response = await axios.put(`http://localhost:4000/api/listProducts/updateSingleProduct/${payload._id}`, { updateDataSingleProduct }, config); //send the '_id', the 'update product'
        if(response.data) { //if response is good
            const responseDB = response.data; //'response.data' is already conveted to json
            console.log(responseDB);
        }
    } 
);

//THUNK - DELETE SINGLE PRODUCT
export const deleteSingleProduct = createAsyncThunk( //'updateProducts/addProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'deleteSingleProduct/addProducts',
    async (payload) => {
        console.log(payload);

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: payload.loginToken, //send token for validation
            },
        };

        const response = await axios.delete(`http://localhost:4000/api/listProducts/deleteProduct/${payload._id}`, config); //simplemente mandamos la propiedad a actualizar '{deprecate: true}'
        if(response.data) { //if response is good
            const responseDB = response.data; //'response.data' is already conveted to json
            console.log(responseDB);
            //return { AddedProduct };//we return an object with API data to extraReducers
        }
    } 
);

//ACTIONS
const listproductsSlice = createSlice({
    name: "listProductss",
    initialState: {
        productos: [],
        advertise: [],
    }, 
    reducers: {
        removeAllState: (state, action) => { //DELETE TASK
            state.productos = [];
        },
        removeAdvertise: (state, action) => { //DELETE ADVERTISE
            state.advertise = [];
        }
    },
    //HANDLE ASYNCTHUNK
    extraReducers: {
        [getAllListProducts.fulfilled]: (state, action) => { //when fetch is succes this receive the payload and return into the reducer
            console.log(action.payload.allLisProducts);
            if(action.payload.allLisProducts.msg) {
                state.advertise = action.payload.allLisProducts; //advertise state-slide
                state.productos = [];
            } else {
                state.productos = action.payload.allLisProducts; //product state-slide
            }
        },
        [addProducts.fulfilled]: (state, action) => { //when fetch is succes this receive the payload and return into the reducer
            if(action.payload.AddedProduct.msg) {
                state.advertise = action.payload.AddedProduct; //advertise state-slide
            } else {
                state.productos.push(action.payload.AddedProduct); //push new product
            }
        },
    }
});

export const { removeAllState, removeAdvertise } = listproductsSlice.actions; //export this method to the UI

export default listproductsSlice.reducer; //export the reducer to import in the store.js