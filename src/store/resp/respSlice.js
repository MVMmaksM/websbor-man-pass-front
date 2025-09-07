import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post, put } from "../../api/fetchApi.js";
import { LOADING_STATUS } from "../../constants/loadingStatus.js";
import { handleErrorReject } from "../handleErrorReject.js";
import { createQueryString } from "../createQueryString.js"

const initialState = {
    //список респондентов
    getRespListLS: LOADING_STATUS.IDLE,
    getRespListError: null,
    respList: null,

    //детали
    getRespDetailLS: LOADING_STATUS.IDLE,
    getRespDetailError: null,
    respDetail: null,

    //получение пароля
    getRespPasswordLS: LOADING_STATUS.IDLE,
    respPassword: '',
    getRespPasswordError: null,

    //создание
    createRespLS: LOADING_STATUS.IDLE,
    createdResp: null,
    createRespError: null,

    //редактирование
    editRespLS: LOADING_STATUS.IDLE,
    editedResp: null,
    editRespError: null
}

export const getRespList = createAsyncThunk(
    "resp/getRespList",
    async (query, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(query);
            const responce = await get(`/resp${queryString}`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const getRespPassword = createAsyncThunk(
    "resp/getRespPassword",
    async (resp_cred_id, { rejectWithValue }) => {
        try {
            const responce = await get(`/resp/${resp_cred_id}/pass`);
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
            const responce = await get(`/resp/${resp_cred_id}`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const createResp = createAsyncThunk(
    "resp/createResp",
    async (resp, { rejectWithValue }) => {
        try {
            const responce = await post(`/resp`, resp);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const editResp = createAsyncThunk(
    "resp/editResp",
    async (resp, { rejectWithValue }) => {
        try {            
            const responce = await put(`/resp/${resp.resp_cred_id}`, resp);
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
    reducers: {
        //для очистки стейта пароля
        clearGetRespPassword(state) {
            state.getRespPasswordLS = LOADING_STATUS.IDLE;
            state.respPassword = '';
            state.getRespPasswordError = null;
        },

        //для очистки стейта создания 
        clearCreateResp(state) {
            state.createRespLS = LOADING_STATUS.IDLE;
            state.createdResp = null;
            state.createRespError = null;
        },

        //для очистки стейта редактирования 
        clearEditResp(state) {
            state.editRespLS = LOADING_STATUS.IDLE;
            state.editedResp = null;
            state.editRespError = null;
        }
    },
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

            //получение пароля
            .addCase(getRespPassword.pending, (state) => {
                state.getRespPasswordLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getRespPassword.fulfilled, (state, action) => {
                state.getRespPasswordLS = LOADING_STATUS.SUCCESS
                state.respPassword = action.payload
            })
            .addCase(getRespPassword.rejected, (state, action) => {
                state.getRespPasswordLS = LOADING_STATUS.FAIL
                state.getRespPasswordError = action.payload
            })

            //создание          
            .addCase(createResp.pending, (state) => {
                state.createRespLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(createResp.fulfilled, (state, action) => {
                state.createRespLS = LOADING_STATUS.SUCCESS
                state.createdResp = action.payload
            })
            .addCase(createResp.rejected, (state, action) => {
                state.createRespLS = LOADING_STATUS.FAIL
                state.createRespError = action.payload
            })

            //редактирование          
            .addCase(editResp.pending, (state) => {
                state.editRespLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(editResp.fulfilled, (state, action) => {
                state.editRespLS = LOADING_STATUS.SUCCESS
                state.editedResp = action.payload
            })
            .addCase(editResp.rejected, (state, action) => {
                state.editRespLS = LOADING_STATUS.FAIL
                state.editRespError = action.payload
            })
    },
}
)

export const { clearGetRespPassword, clearCreateResp, clearEditResp } = respSlice.actions
export default respSlice.reducer;