import { setAlert } from "../store/alert/alertSlice";
import { ALERTTYPES } from "../store/alert/alertTypes.js";

export const ErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        const { payload, error } = action;
        const errorData = payload || error;

        const status = errorData.status;
        const message = errorData.details || error.message || 'Неизвестная ошибка';

        switch (status) {
            case 400:
                store.dispatch(setAlert({ type: ALERTTYPES.FAIL, message: message }))
                break;

            case 401:      
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