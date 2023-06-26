import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //'createAsyncThunk' is a function that return another function('getListProducts') whitch will call API and return a promise. Then this function 'getListProducts' we will use to dispatch in the UI components
import axios from "axios";

//THUNK - POST
export const addUserRegister = createAsyncThunk( //'listProducts/getListProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'userRegister/addUserRegister',
    async (payload) => {

        const newUserRegister = {
            userName: payload.registerName,
            userPassword: payload.registerPassword,
        }
        console.log(newUserRegister);

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios.post('http://localhost:4000/api/userRegisterLogin/createRegister', {newUserRegister}, config);
        if(response.data) { //if response is good
            const registerUser = response.data; //'response.data' is already conveted to json
            console.log(registerUser);
            return { registerUser };//we return an object with API data to extraReducers
        }
    } 
);



//ACTIONS
const userRegiterSlice = createSlice({
    name: "userRegiter",
    initialState: { //state
        register: [],
        message: [],
    }, 
    reducers: {
        cleanRegister: (state, action) => { //CLEAN register
            state.register = [];
            state.message = [];
        },
    },
    //HANDLE ASYNCTHUNK
    extraReducers: {
        [addUserRegister.fulfilled]: (state, action) => { //when fetch is succes this receive the payload and return into the reducer
            console.log(action.payload.registerUser);
            if(action.payload.registerUser.msg) {
                state.message = action.payload.registerUser;
            } else {
                state.register = action.payload.registerUser; //user register data
            }
        }
    }
});

export const { cleanRegister } = userRegiterSlice.actions; //export this method to the UI

export default userRegiterSlice.reducer; //export the reducer to import in the store.js