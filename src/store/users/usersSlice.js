import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../api/fetchApi.js";
import {LOADING_STATUS} from "../../constants/loadingStatus.js";
import {handleErrorReject} from "../handleErrorReject.js";


const initialState = {
    //список пользователей
    getUsersListLS: LOADING_STATUS.IDLE,
    getUsersListError: null,
    usersList: null   
}

export const getUsersList = createAsyncThunk(
    "users/getUsersList",
    async (_, { rejectWithValue }) => {
        try {           
            const responce = await get(`/users`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers(builder) {
        builder
            //список респондентов
            .addCase(getUsersList.pending, (state) => {
                state.getUsersListLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getUsersList.fulfilled, (state, action) => {
                state.getUsersListLS = LOADING_STATUS.SUCCESS
                state.usersList = action.payload
            })
            .addCase(getUsersList.rejected, (state, action) => {               
                state.getUsersListLS = LOADING_STATUS.FAIL
                state.getUsersListError = action.payload
            })
    },
}
)

export default usersSlice.reducer;

