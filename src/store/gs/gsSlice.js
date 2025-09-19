import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, download } from "../../api/fetchApi";
import { LOADING_STATUS } from "../../constants/loadingStatus";
import { createQueryString } from "../createQueryString";

const initialState = {
    //organization
    getOrganizatonLS: LOADING_STATUS.IDLE,
    getOrganizatonError: null,
    organization: null,

    //forms
    getFormsLS: LOADING_STATUS.IDLE,
    getFormsError: null,
    forms: null,

    //файл с кодами
    donwnloadInfoCodeLS: LOADING_STATUS.IDLE,
    donwnloadInfoCodeError: null
}

export const donwnloadInfoCode = createAsyncThunk(
    "gs/donwnloadInfoCode",
    async (params, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(params);
            await download(`/gs/export${queryString}`);           
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const getForms = createAsyncThunk(
    "gs/getForms",
    async (query, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(query);
            const responce = await get(`/gs/forms${queryString}`);
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

export const getOrganizaton = createAsyncThunk(
    "gs/getOrganizaton",
    async (query, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(query);
            const responce = await get(`/gs/organization${queryString}`);
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

const gsSlice = createSlice({
    name: "gs",
    initialState,
    reducers: {
        //очистка стейта организации
        clearOrganization(state) {
            state.getOrganizatonLS = LOADING_STATUS.IDLE;
            state.getOrganizatonError = null;
            state.organization = null;
        },

        //очистка стейта списка форм
        clearForms(state) {
            state.getFormsLS = LOADING_STATUS.IDLE;
            state.getFormsError = null;
            state.forms = null;
        }
    },
    extraReducers(builder) {
        builder
            //organization
            .addCase(getOrganizaton.pending, (state) => {
                state.getOrganizatonLS = LOADING_STATUS.IN_PROGRESS;
            })
            .addCase(getOrganizaton.fulfilled, (state, action) => {
                state.getOrganizatonLS = LOADING_STATUS.SUCCESS;
                state.organization = action.payload;
            })
            .addCase(getOrganizaton.rejected, (state, action) => {
                state.getOrganizatonLS = LOADING_STATUS.FAIL;
                state.getOrganizatonError = action.payload;
            })

            //forms
            .addCase(getForms.pending, (state) => {
                state.getFormsLS = LOADING_STATUS.IN_PROGRESS;
            })
            .addCase(getForms.fulfilled, (state, action) => {
                state.getFormsLS = LOADING_STATUS.SUCCESS;
                state.forms = action.payload;
            })
            .addCase(getForms.rejected, (state, action) => {
                state.getFormsLS = LOADING_STATUS.FAIL;
                state.getFormsError = action.payload;
            })

            //donwload            
            .addCase(donwnloadInfoCode.pending, (state) => {
                state.donwnloadInfoCodeLS = LOADING_STATUS.IN_PROGRESS;
            })
            .addCase(donwnloadInfoCode.fulfilled, (state, action) => {
                state.donwnloadInfoCodeLS = LOADING_STATUS.SUCCESS;               
            })
            .addCase(donwnloadInfoCode.rejected, (state, action) => {
                state.donwnloadInfoCodeLS = LOADING_STATUS.FAIL;
                state.donwnloadInfoCodeError = action.payload;
            })
    },
}
)

export const { clearOrganization, clearForms } = gsSlice.actions;
export default gsSlice.reducer;