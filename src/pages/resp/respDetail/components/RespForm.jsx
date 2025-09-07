import { useEffect, useState } from "react";
import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate";
import { getRespPassword, clearGetRespPassword } from "../../../../store/resp/respSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { Spinner } from "../../../../components/Spinner.jsx";

export const RespForm = ({ respDetail }) => {
    const [showPassword, setShowPassword] = useState(false);
    const respPassword = useSelector(state => state.resp.respPassword.password);
    const getRespPasswordLS = useSelector(state => state.resp.getRespPasswordLS);
    const dispatch = useDispatch();

    const togglePassword = () => {
        if (getRespPasswordLS === LOADING_STATUS.IDLE)
            dispatch(getRespPassword(respDetail.resp_cred_id));
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        return () => {
            dispatch(clearGetRespPassword());
        };
    }, [])

    return (
        <div className="row">
            <div className="col-lg-8">
                <div
                    className="p-3"
                    style={{
                        backgroundColor: '#EDEDED',
                        borderRadius: '6px',
                        minHeight: '60px',
                        boxSizing: 'border-box',
                        width: '100%',
                    }}
                >
                    <div className="mb-2">
                        <span className="text-secondary">Наименование</span>
                        <span> {respDetail.name ? respDetail.name : "Не указано"}</span>
                    </div>

                    <div className="d-flex flex-wrap gap-3 align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <span className="text-secondary me-1">ОКПО</span>
                            <span> {respDetail.okpo ? respDetail.okpo : "Не указано"}</span>
                        </div>

                        <div className="d-flex align-items-center">
                            <span className="text-secondary me-2">Пароль</span>

                            {getRespPasswordLS === LOADING_STATUS.IN_PROGRESS ?
                                <Spinner
                                    color={'primary'}
                                    divStyle={{ width: '90px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                    spinnerStyle={{ width: '15px', height: '15px' }} />

                                : <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control-plaintext text-center me-2"
                                    value={respPassword ?? '        '}
                                    disabled
                                    autoComplete="off"
                                    style={{ width: '90px' }}
                                />}

                            <button
                                type="button"
                                className="btn btn-link p-0 border-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Показать пароль"
                                onClick={togglePassword}
                                disabled={getRespPasswordLS === LOADING_STATUS.IN_PROGRESS}
                            >
                                {showPassword ?
                                    <i className="bi bi-eye-slash-fill" style={{ color: '#6c757d', cursor: 'pointer' }}></i>
                                    :
                                    <i className="bi bi-eye-fill" style={{ color: '#6c757d', cursor: 'pointer' }}></i>}

                            </button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <span className="text-secondary me-1">Примечание</span>
                        <span> {respDetail.comment ? respDetail.comment : "Не указано"}</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div
                    className="p-3"
                    style={{
                        backgroundColor: '#EDEDED',
                        borderRadius: '6px',
                        minHeight: '70px',
                        boxSizing: 'border-box',
                        width: '100%',
                    }}
                >
                    <div className="mb-2">
                        <span className="text-secondary">Последнее изменение </span>
                        {respDetail.updated_on_tz ?
                            <IsoToLocaleDate iso={respDetail.updated_on_tz} /> :
                            <span> Не указано</span>}
                    </div>
                    <div className="mb-2">
                        <span className="text-secondary">Изменил</span>
                        <span> {respDetail.updated_by_str ? respDetail.updated_by_str : "Не указано"}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-secondary">Активно</span>
                        <span> {respDetail.is_active ? "Да" : "Нет"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}