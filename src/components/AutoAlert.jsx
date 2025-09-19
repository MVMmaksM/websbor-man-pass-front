import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../store/alert/alertSlice";
import { ALERT_TYPES } from "../store/alert/alertTypes";

export const AutoAlert = () => {
    const duration = 5000;
    const type = useSelector(state => state.alert.type);
    const message = useSelector(state => state.alert.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearAlert());
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, dispatch, duration]);

    if (!message) return null;

    const color = ALERT_TYPES.FAIL === type ? "alert-danger" : "alert-success";
    const textColor = ALERT_TYPES.FAIL === type ? "text-danger" : "text-success";
    const icon = ALERT_TYPES.FAIL === type ? "bi bi-bug" : "bi bi-check-circle";

    return (
        <div id="auto_alert"         
            className={`alert ${color}`} role="alert" >
            <i className={`${icon} ${textColor} fs-6`} style={{ marginRight: '8px' }}></i>
            {message}
        </div >
    )
}