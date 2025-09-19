import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from "../../api/fetchApi.js";
import { LOADING_STATUS } from "../../constants/loadingStatus.js";
import { handleErrorReject } from "../handleErrorReject.js";
import { createQueryString } from "../createQueryString.js";


const initialState = {
    //список пользователей
    getUsersListLS: LOADING_STATUS.IDLE,
    getUsersListError: null,
    usersList: null,

    //фильтры
    usersFilter: null,

    //роли пользователей
    getUsersRolesLS: LOADING_STATUS.IDLE,
    getUsersRolesError: null,
    usersRoles: null,

    //создание
    createUserLS: LOADING_STATUS.IDLE,
    createUserError: null,
    createdUser: null
}

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user, { rejectWithValue }) => {
        try {
            const responce = await post(`/users`, user);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const getUsersRoles = createAsyncThunk(
    "users/getUsersRoles",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await get(`/users/roles`);
            return responce;
        } catch (error) {
            const err = handleErrorReject(error);
            return rejectWithValue(err);
        }
    }
)

export const getUsersList = createAsyncThunk(
    "users/getUsersList",
    async (query, { rejectWithValue }) => {
        try {
            const queryString = createQueryString(query);
            const responce = await get(`/users${queryString}`);
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
    reducers: {
        //установка фильтров
        setFilter(state, action) {
            state.usersFilter = action.payload;
        },

        //сброс фильтров
        clearFilter(state) {
            state.usersFilter = null;
        },

        //для очистки стейта создания 
        clearCreateUser(state) {
            state.createUserLS = LOADING_STATUS.IDLE;
            state.createdUser = null;
            state.createUserError = null;
        },
    },
    extraReducers(builder) {
        builder
            //список пользователей
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

            //роли пользователей            
            .addCase(getUsersRoles.pending, (state) => {
                state.getUsersRolesLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(getUsersRoles.fulfilled, (state, action) => {
                state.getUsersRolesLS = LOADING_STATUS.SUCCESS
                state.usersRoles = action.payload
            })
            .addCase(getUsersRoles.rejected, (state, action) => {
                state.getUsersRolesLS = LOADING_STATUS.FAIL
                state.getUsersRolesError = action.payload
            })

            //создание          
            .addCase(createUser.pending, (state) => {
                state.createUserLS = LOADING_STATUS.IN_PROGRESS
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createUserLS = LOADING_STATUS.SUCCESS
                state.createdUser = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createUserLS = LOADING_STATUS.FAIL
                state.createUserError = action.payload
            })
    },
}
)

export const { setFilter, clearFilter, clearCreateUser } = usersSlice.actions;
export default usersSlice.reducer;

