import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //'createAsyncThunk' is a function that return another function('getListProducts') whitch will call API and return a promise. Then this function 'getListProducts' we will use to dispatch in the UI components
import axios from "axios";

//THUNK - POST
export const userLogin = createAsyncThunk( //'listProducts/getListProducts' is a string parameter that will be used to generate additional Redux action type constants, representing the lifecycle of an async request: 1)pending, 2)fulfilled, 3)rejected (es decir, indica el ciclo del estado de la petición)
    'UserLogin/userLogin',
    async (payload) => {
        console.log(payload);

        const addUserLogin = {
            userName: payload.loginName,
            userPassword: payload.loginPassword,
        }
        console.log(addUserLogin);

        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };

        const response = await axios.post('http://localhost:4000/api/userRegisterLogin/getUserLogin', {addUserLogin}, config);
        if(response.data) { //if response is good
            const loginUser = response.data; //'response.data' is already conveted to json
            console.log(loginUser);
            return { loginUser };//we return an object with API data to extraReducers
        }
        
    } 
);

//ACTIONS
const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
        users: [],
        message: [],
    },
    reducers: {
        userLogOut: (state, action) => { //CLEAN register
            state.users = [];

            if(state.message.length !== 0) {
                console.log('entre a state.message');
                state.message = [];
            }
        },
    },
    //HANDLE ASYNCTHUNK
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => { //when fetch is succes this receive the payload and return into the reducer
            if(action.payload.loginUser.msg) {
                state.message = action.payload.loginUser;
            } else {
                state.users = action.payload.loginUser; //user login data
            }
        },
    }
});

export const { userLogOut } = userLoginSlice.actions; //export this method to the UI
export default userLoginSlice.reducer; //export the reducer to import in the store.js