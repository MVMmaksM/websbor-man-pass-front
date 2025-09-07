import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, get } from "../../api/fetchApi"
import {LOADING_STATUS} from "../../constants/loadingStatus.js";

const initialState = {
	//login
	loginLS: LOADING_STATUS.IDLE,
	loginError: null,
	loginStatus: null,
	//check auth
	checkAuthLS: LOADING_STATUS.IDLE,
	checkAuthError: null,
	checkAuthStatus: null,	
	//logout
	logoutLS:LOADING_STATUS.IDLE,
	logoutError: null,
	logoutStatus: null
}

export const authLogin = createAsyncThunk(
	"auth/authLogin",
	async (credential, { rejectWithValue }) => {
		try {
			const responce = await post("/auth/login", credential);
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

export const checkAuth = createAsyncThunk(
	"auth/checkAuth",
	async (_, {rejectWithValue} ) => {
		try {
			const responce = await get("/auth/cookie/status");
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
			.addCase(authLogin.pending, (state) => {
				state.loginLS = LOADING_STATUS.IN_PROGRESS
			})
			.addCase(authLogin.fulfilled, (state, action) => {
				state.loginLS = LOADING_STATUS.SUCCESS
				state.loginStatus = action.payload
			})
			.addCase(authLogin.rejected, (state, action) => {
				state.loginLS = LOADING_STATUS.FAIL
				state.loginError = action.payload
			})
			.addCase(checkAuth.pending, (state) => {
				state.checkAuthLS = LOADING_STATUS.IN_PROGRESS
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.checkAuthLS = LOADING_STATUS.SUCCESS
				state.checkAuthStatus = action.payload
			})
			.addCase(checkAuth.rejected, (state, action) => {				
				state.checkAuthLS = LOADING_STATUS.FAIL
				state.checkAuthError = action.payload				
			})
			
	},
}
)


export default authSlice.reducer;