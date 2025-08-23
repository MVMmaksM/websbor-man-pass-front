import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../api/fetchApi";

const initialState = {
    status: "idle",
    error: null,
    userData: null
}

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_ ,{ rejectWithValue }) => {
        try {
            const responce = await get("http://localhost:3000/api/v1/profile");            
            return responce;
        } catch (error) {         
            const err = {};
          
            if (error.message) {
                err.status = error.message.split(":")[0];
                err.message = error.message.split(":")[1];
            }

            if(error.details){
                err.status = error.status || null;
                err.message = error.details;
            }
          
            return rejectWithValue(err);
        }
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = 'in progress'
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'success'
                state.userData = {...action.payload}
            })
            .addCase(getProfile.rejected, (state, action) => {               
                state.status = 'fail'
                state.error = action.payload
            })
    },
}
)

export default profileSlice.reducer;