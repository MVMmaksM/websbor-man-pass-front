import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post, get } from "../../api/fetchApi"
import { LOADING_STATUS } from "../../constants/loadingStatus.js";

const initialState = {	
	authLS: LOADING_STATUS.IDLE,
	authError: null,
	isAuth: null,

	//check auth
	checkAuthLS: LOADING_STATUS.IDLE,
	checkAuthError: null,
	checkAuthStatus: null,
}

export const authLogout = createAsyncThunk(
	"auth/authLogout",
	async (_, { rejectWithValue }) => {
		try {
			const responce = await post("/auth/logout");
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
	async (_, { rejectWithValue }) => {
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
	reducers: {
		//для очистки стейта входа
		clearAuth(state) {
			state.authLS = LOADING_STATUS.IDLE;
			state.authError = null;
			state.isAuth = null
		},
	},
	extraReducers(builder) {
		builder
			//login
			.addCase(authLogin.pending, (state) => {
				state.authLS = LOADING_STATUS.IN_PROGRESS
			})
			.addCase(authLogin.fulfilled, (state, action) => {
				state.authLS = LOADING_STATUS.SUCCESS
				state.isAuth = action.payload
			})
			.addCase(authLogin.rejected, (state, action) => {
				state.authLS = LOADING_STATUS.FAIL
				state.authError = action.payload
			})

			//checkAuth
			.addCase(checkAuth.pending, (state) => {
				state.checkAuthLS = LOADING_STATUS.IN_PROGRESS
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.checkAuthLS = LOADING_STATUS.SUCCESS
				state.isAuth = action.payload
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.checkAuthLS = LOADING_STATUS.FAIL
				state.checkAuthError = action.payload
			})

			//logout
			.addCase(authLogout.pending, (state) => {
				state.authLS = LOADING_STATUS.IN_PROGRESS
			})
			.addCase(authLogout.fulfilled, (state, action) => {
				state.authLS = LOADING_STATUS.SUCCESS
				state.isAuth = action.payload
			})
			.addCase(authLogout.rejected, (state, action) => {
				state.authLS = LOADING_STATUS.FAIL
				state.authError = action.payload
			})

	},
}
)

export const {clearAuth} = authSlice.actions
export default authSlice.reducer;