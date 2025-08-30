import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../api/fetchApi.js";
import {LOADING_STATUS} from "../../constants/loadingStatus.js";
import {handleErrorReject} from "../handleErrorReject.js";
import {createQueryString} from "../createQueryString.js"

const initialState = {
    //список респондентов
    getRespListLS: LOADING_STATUS.IDLE,
    getRespListError: null,
    respList: null,

    //детали
    getRespDetailLS: LOADING_STATUS.IDLE,
    getRespDetailError: null,
    respDetail: null    
}

export const getRespList = createAsyncThunk(
    "resp/getRespList",
    async (params, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(params);
            const responce = await get(`http://localhost:3000/api/v1/resp${queryString}`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const getRespDetail = createAsyncThunk(
    "resp/getRespDetail",
    async (resp_cred_id, { rejectWithValue }) => {
        try {
            const responce = await get(`http://localhost:3000/api/v1/resp/${resp_cred_id}`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

const respSlice = createSlice({
    name: "resp",
    initialState,
    extraReducers(builder) {
        builder
            //список респондентов
            .addCase(getRespList.pending, (state) => {
                state.getRespListLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getRespList.fulfilled, (state, action) => {
                state.getRespListLS = LOADING_STATUS.SUCCESS
                state.respList = action.payload
            })
            .addCase(getRespList.rejected, (state, action) => {               
                state.getRespListLS = LOADING_STATUS.FAIL
                state.getRespListError = action.payload
            })

            //детали респондента
            .addCase(getRespDetail.pending, (state) => {
                state.getRespDetailLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getRespDetail.fulfilled, (state, action) => {
                state.getRespDetailLS = LOADING_STATUS.SUCCESS
                state.respDetail = action.payload
            })
            .addCase(getRespDetail.rejected, (state, action) => {               
                state.getRespDetailLS = LOADING_STATUS.FAIL
                state.getRespDetailError = action.payload
            })
    },
}
)

export default respSlice.reducer;