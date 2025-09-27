import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import {auth} from "../../utils/firebase"

//signup
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({email,password},{rejectWithValue})=>{
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,email,password 
            )
            return userCredentials.user
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

//login
export const loginUser = createAsyncThunk("auth/loginUser",
     async({email,password},{rejectWithValue})=>{
        try {
            const userCredentials = await signInWithEmailAndPassword(auth,email,password)
            return userCredentials.user;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)

//Auth Slice
const authSlice = createSlice({
    name : "auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
    },
    resucers:{},
    extraReducers:(builder)=>{
        builder
        //signup
        .addCase(signupUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })

        //login
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = action.payload
        })
    }
})
export const {logout} = authSlice.actions;
export default authSlice.reducer;