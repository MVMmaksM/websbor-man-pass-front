import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, get } from "../../api/fetchApi"

const initialState = {
	fetchAuthLS: "idle",
	fetchAuthError: null,

	checkAuthLS: "idle",
	checkAuthError: null,
	authStatus: null	
}

export const fetchAuth = createAsyncThunk(
	"auth/fetchAuth",
	async (credential, { rejectWithValue }) => {
		try {
			const responce = await post("http://localhost:3000/api/v1/auth/login", credential);
			return responce;
		} catch (error) {
			const err = {};

			if (error.message) {
				err.status = error.message.split(":")[0];
				err.message = error.message.split(":")[1];
			}

			if (error.details) {
				err.status = error.status || null;
				err.message = error.details;
			}

			return rejectWithValue(err);
		}
	}
)

export const checkStatusAuth = createAsyncThunk(
	"auth/checkStatusAuth",
	async (_, {rejectWithValue} ) => {
		try {
			const responce = await get("http://localhost:3000/api/v1/auth/cookie/status");
			return responce;
		} catch (error) {
			const err = {};

			if (error.message) {
				err.status = error.message.split(":")[0];
				err.message = error.message.split(":")[1];
			}

			if (error.details) {
				err.status = error.status || null;
				err.message = error.details;
			}

			return rejectWithValue(err);
		}
	}
)

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers(builder) {
		builder
			.addCase(fetchAuth.pending, (state) => {
				state.fetchAuthLS = 'in progress'
			})
			.addCase(fetchAuth.fulfilled, (state) => {
				state.fetchAuthLS = 'success'
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.fetchAuthLS = 'fail'
				state.fetchAuthError = action.payload
			})
			.addCase(checkStatusAuth.pending, (state) => {
				state.checkAuthLS = 'in progress'
			})
			.addCase(checkStatusAuth.fulfilled, (state, action) => {
				state.checkAuthLS = 'success'
				state.authStatus = action.payload
			})
			.addCase(checkStatusAuth.rejected, (state, action) => {				
				state.checkAuthLS = 'fail'
				state.checkAuthError = action.payload				
			})
			
	},
}
)


export default authSlice.reducer;