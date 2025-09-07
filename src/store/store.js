import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware'
import alertReducer from "./alert/alertSlice" 
import profileReducer from "./profile/profileSlice"
import respReducer from "./resp/respSlice"
import usersReducer from "./users/usersSlice"

export default configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
		profile: profileReducer,
		resp: respReducer,
		users: usersReducer
	},
	middleware: (getDefaultMiddleware) =>
    	getDefaultMiddleware().concat(ErrorHandlerMiddleware),
})