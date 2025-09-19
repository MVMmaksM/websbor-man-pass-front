import { setAlert } from "../store/alert/alertSlice";
import { ALERT_TYPES } from "../store/alert/alertTypes.js";
import { clearAuth } from "../store/auth/authSlice.js";

export const ErrorHandlerMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        const { payload } = action;
        const errorData = payload;

        const status = Number(errorData?.status);
        const message = errorData?.details || payload?.message || 'Неизвестная ошибка';

        switch (status) {
            case 400:
                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
                break;

            case 401:
                if (location.pathname === "/auth/login")
                    break;

                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
                //чистим ауф
                store.dispatch(clearAuth());
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 1000);
                break;

            case 403:
                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
                break;

            case 404:
                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
                break;

            case 500:
                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
                break;

            default:
                store.dispatch(setAlert({ type: ALERT_TYPES.FAIL, message: message }))
        }

        console.error('[API Error]', { status, message, action: action.type });
    }

    return next(action);
}