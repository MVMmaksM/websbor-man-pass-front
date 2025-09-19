import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../../api/fetchApi";
import { LOADING_STATUS } from "../../constants/loadingStatus";

const initialState = {
    getProfileLS: LOADING_STATUS.IDLE,
    getProfileError: null,
    profile: null
}

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await get("/profile");
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

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfile(state) {
            state.getProfileLS = LOADING_STATUS.IDLE
            state.getProfileError = null
            state.profile = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProfile.pending, (state) => {
                state.getProfileLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.getProfileLS = LOADING_STATUS.SUCCESS
                state.profile = { ...action.payload }
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.getProfileLS = LOADING_STATUS.FAIL
                state.getProfileError = action.payload
            })
    },
}
)

export const {clearProfile} = profileSlice.actions;
export default profileSlice.reducer;