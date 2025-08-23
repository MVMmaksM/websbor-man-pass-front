import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../api/fetchApi";

const initialState = {
    getRespLS: "idle",
    getRespError: null,
    respondents: null
}

export const getRespondents = createAsyncThunk(
    "respondents/getRespondents",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await get("http://localhost:3000/api/v1/respondents");
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

const respondentsSlice = createSlice({
    name: "respondents",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getRespondents.pending, (state) => {
                state.getRespLS = 'in progress'
            })
            .addCase(getRespondents.fulfilled, (state, action) => {
                state.getRespLS = 'success'
                state.respondents = action.payload
            })
            .addCase(getRespondents.rejected, (state, action) => {               
                state.getRespLS = 'fail'
                state.getRespError = action.payload
            })
    },
}
)

export default respondentsSlice.reducer;