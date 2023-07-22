import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

//THUNK - GET
export const getAllListProducts = createAsyncThunk( 
    'allListProducts/getListProducts',
    async (payload) => {
        const token = payload;

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: token, 
            },
        };

        const response = await axios.get('https://expired-products-ho-app-api-v1.vercel.app/api/listProducts/allProducts', config);
        if(response.data) { 
            const allLisProducts = response.data; 
            return { allLisProducts };
        }
    } 
);

//THUNK - POST
export const addProducts = createAsyncThunk( 
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
              authorization: payload.loginToken, 
            },
        };

        const response = await axios.post('https://expired-products-ho-app-api-v1.vercel.app/api/listProducts/createProduct', {dataNewProduct}, config);
        if(response.data) { 
            const AddedProduct = response.data; 
            return { AddedProduct };
        }
    } 
);

//THUNK - PUT
export const updateProducts = createAsyncThunk( 
    'updateProducts/addProducts',
    async (payload) => {

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios.put(`https://expired-products-ho-app-api-v1.vercel.app/api/listProducts/updateProduct/${payload._id}`, payload, config); 
    } 
);

//THUNK - PUT - SINGLE PRODUCT
export const updateSingleProduct = createAsyncThunk( 
    'updateSingleProduct/addProducts',
    async (payload) => {

        const updateDataSingleProduct = {
            productName: payload.products.productName,
            productImage: payload.products.productImage,
            price: payload.products.price,
            expireProductDate: { expireProductDay: payload.products.expire.day, expireProductMonth: payload.products.expire.month, expireProductYear: payload.products.expire.year },
            expireTime: payload.products.expireTimeUpdate,
        }

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: payload.loginToken, 
            },
        };

        const response = await axios.put(`https://expired-products-ho-app-api-v1.vercel.app/api/listProducts/updateSingleProduct/${payload._id}`, { updateDataSingleProduct }, config); 
    } 
);

//THUNK - DELETE SINGLE PRODUCT
export const deleteSingleProduct = createAsyncThunk( 
    'deleteSingleProduct/addProducts',
    async (payload) => {

        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: payload.loginToken, 
            },
        };

        const response = await axios.delete(`https://expired-products-ho-app-api-v1.vercel.app/api/listProducts/deleteProduct/${payload._id}`, config);
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
        [getAllListProducts.fulfilled]: (state, action) => {
            if(action.payload.allLisProducts.msg) {
                state.advertise = action.payload.allLisProducts; //advertise state-slide
                state.productos = [];
            } else {
                state.productos = action.payload.allLisProducts; //product state-slide
            }
        },
        [addProducts.fulfilled]: (state, action) => { 
            if(action.payload.AddedProduct.msg) {
                state.advertise = action.payload.AddedProduct; //advertise state-slide
            } else {
                state.productos.push(action.payload.AddedProduct); //push new product
            }
        },
    }
});

export const { removeAllState, removeAdvertise } = listproductsSlice.actions; 

export default listproductsSlice.reducer;