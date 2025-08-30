import { setAlert } from "../store/alert/alertSlice";
import { ALERTTYPES } from "../store/alert/alertTypes.js";

export const ErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        const { payload } = action;
        const errorData = payload;   

        const status = Number(errorData?.status);
        const message = errorData?.details || payload?.message || 'Неизвестная ошибка';

        switch (status) {
            case 400:
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                break;

            case 401:   
                if(location.pathname === "/auth/login")
                    break;
                   
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 2000);
                break;

            case 403:
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                break;

            case 404:            
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                break;

            case 500:
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                break;

            default:
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
        }

        console.error('[API Error]', { status, message, action: action.type });
    }

    return next(action);
}