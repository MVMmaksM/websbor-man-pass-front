import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../store/alert/alertSlice";
import { ALERTTYPES } from "../store/alert/alertTypes";

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

    const color = ALERTTYPES.FAIL === type ? "alert-danger" : "alert-success";

    return (
        <div id="alert"         
            className={`alert ${color}`} role="alert" >
            <i className="bi bi-exclamation-circle text-danger fs-6" style={{ marginRight: '8px' }}></i>
            {message}
        </div >
    )
}