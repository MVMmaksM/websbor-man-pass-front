import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../api/fetchApi"

const initialState = {
    status: "idle",
    error: null
}

export const fetchAuth = createAsyncThunk(
    "auth/fetchAuth",
    async (credential) =>{
        const responce = await post("http://localhost:3000/api/v1/auth", credential);
        return responce;
    }
)    

const authSlice = createSlice({
        name: "auth",
        initialState,
        extraReducers(builder) {
			builder
			.addCase(fetchAuth.pending, (state) => {
				state.status = 'in progress'			
			})
			.addCase(fetchAuth.fulfilled, (state) => {				
				state.status = 'success'				
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.status = 'fail'
				state.error = action.error
			})				
		},
    } 
)


export default authSlice.reducer;