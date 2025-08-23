import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice"
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware'
import alertReducer from "./alert/alertSlice" 

export default configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer
	},
	middleware: (getDefaultMiddleware) =>
    	getDefaultMiddleware().concat(ErrorHandlerMiddleware),
})