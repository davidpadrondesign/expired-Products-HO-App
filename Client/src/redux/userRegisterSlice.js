import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

//THUNK - POST
export const addUserRegister = createAsyncThunk( 
    'userRegister/addUserRegister',
    async (payload) => {

        const newUserRegister = {
            userName: payload.registerName,
            userPassword: payload.registerPassword,
        }

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
        };

        const response = await axios.post('https://expired-products-ho-app-api-v1.vercel.app/api/userRegisterLogin/createRegister', {newUserRegister}, config);
        if(response.data) { 
            const registerUser = response.data; 
            return { registerUser };
        }
    } 
);



//ACTIONS
const userRegiterSlice = createSlice({
    name: "userRegiter",
    initialState: { 
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
        [addUserRegister.fulfilled]: (state, action) => { 
            if(action.payload.registerUser.msg) {
                state.message = action.payload.registerUser;
            } else {
                state.register = action.payload.registerUser; //user register data
            }
        }
    }
});

export const { cleanRegister } = userRegiterSlice.actions; 

export default userRegiterSlice.reducer; 