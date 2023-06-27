import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

//THUNK - POST
export const userLogin = createAsyncThunk( 
    'UserLogin/userLogin',
    async (payload) => {

        const addUserLogin = {
            userName: payload.loginName,
            userPassword: payload.loginPassword,
        }

        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };

        const response = await axios.post('http://localhost:4000/api/userRegisterLogin/getUserLogin', {addUserLogin}, config);
        if(response.data) { 
            const loginUser = response.data; 
            return { loginUser };
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
                state.message = [];
            }
        },
    },
    //HANDLE ASYNCTHUNK
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => { 
            if(action.payload.loginUser.msg) {
                state.message = action.payload.loginUser; //expired msg
            } else {
                state.users = action.payload.loginUser; //user login data
            }
        },
    }
});

export const { userLogOut } = userLoginSlice.actions; 
export default userLoginSlice.reducer; 