import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRespDetail, getRespPassword, clearGetRespPassword, editResp, clearEditResp } from "../../../../store/resp/respSlice.js";
import { Spinner } from "../../../../components/Spinner.jsx";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { CustomSelect } from "../../../../components/CustomSelect.jsx";
import { useNavigate } from "react-router-dom";

export const EditRespForm = ({ resp_cred_id }) => {
    const [showPassword, setShowPassword] = useState(false);
    const getRespDetailLS = useSelector(state => state.resp.getRespDetailLS);
    const respDetail = useSelector(state => state.resp.respDetail);
    const getRespPasswordLS = useSelector(state => state.resp.getRespPasswordLS);
    const respPassword = useSelector(state => state.resp.respPassword.password);

    const editRespLS = useSelector(state => state.resp.editRespLS);

    const navigate = useNavigate();

    const [editedResp, setEditResp] = useState({
        name: '',
        okpo: '',        
        comment: '',
        is_active: null
    });
    const dispatch = useDispatch();

    //при открывании пароля 
    //получаем его с бэка
    const togglePassword = () => {
        if (getRespPasswordLS === LOADING_STATUS.IDLE)
            dispatch(getRespPassword(respDetail.resp_cred_id));
        setShowPassword(!showPassword);
    };

    //получаем детали редактируемого 
    //респондента
    useEffect(() => {
        dispatch(getRespDetail(resp_cred_id));
    }, [dispatch, resp_cred_id]);

    //если детали получены
    //кладем их в локальный стейт
    useEffect(() => {
        if (getRespDetailLS === LOADING_STATUS.SUCCESS)
            setEditResp(prev => ({
                ...prev,
                name: respDetail.name,
                okpo: respDetail.okpo,
                comment: respDetail.comment,
                is_active: respDetail.is_active,
                resp_cred_id: respDetail.resp_cred_id
            }));
    }, [getRespDetailLS, respDetail]);

    //получен пароль - кладем его в локальный стейт
    useEffect(() => {
        if (getRespPasswordLS === LOADING_STATUS.SUCCESS)
            setEditResp(prev => ({
                ...prev,
                password: respPassword
            }));

    }, [getRespPasswordLS, respPassword]);

    //очистка
    useEffect(() => {
        return () => {
            //очищаем стейт пароля
            dispatch(clearGetRespPassword());
            //очищаем стейт редактирования
            dispatch(clearEditResp());
        };
    }, []);

    //успешно отредактировано
    //редирект на детали
    useEffect(() => {
        if (editRespLS === LOADING_STATUS.SUCCESS)
            navigate(`/main/resp/${resp_cred_id}`);
    })

    //отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();    
        dispatch(editResp(editedResp));
    };

    //изменение локального стейта при редактировании
    const onChangeEditResp = (e) => {
        const { name, value } = e.target;       
        setEditResp(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //для активно
    const optionsIsActive = [
        { value: true, label: 'Да' },
        { value: false, label: 'Нет' }
    ];

    return (
        <>
            {getRespDetailLS === LOADING_STATUS.IN_PROGRESS ? < Spinner />
                :
                <div className="row">
                    <div className="col-lg-6">
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
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="mb-2 col-12">
                                        <input
                                            name="name"
                                            type='text'
                                            className="form-control"
                                            value={editedResp.name}
                                            autoComplete="name"
                                            placeholder="Наименование"
                                            onChange={onChangeEditResp}
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mb-2">
                                    <div className="col-lg-4">
                                        <div className="d-flex align-items-center">
                                            <input
                                                name="okpo"
                                                type="number"
                                                className="form-control"
                                                value={editedResp.okpo}
                                                autoComplete="okpo"
                                                placeholder="ОКПО"
                                                onChange={onChangeEditResp}
                                                onWheel={(e) => e.target.blur()}
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="d-flex align-items-center">
                                            <div className="input-group">

                                                {getRespPasswordLS === LOADING_STATUS.IN_PROGRESS ?
                                                    <Spinner
                                                        color={'primary'}
                                                        divStyle={{ width: '90px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                                        spinnerStyle={{ width: '15px', height: '15px' }} /> :
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="form-control"
                                                        name="password"
                                                        value={editedResp.password}
                                                        autoComplete="password"
                                                        placeholder="Пароль"
                                                        onChange={onChangeEditResp}
                                                    />
                                                }

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={togglePassword}
                                                    disabled={getRespPasswordLS === LOADING_STATUS.IN_PROGRESS}
                                                >
                                                    {showPassword ? (
                                                        <i className="bi bi-eye-slash-fill"></i>
                                                    ) : (
                                                        <i className="bi bi-eye-fill"></i>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <CustomSelect
                                            options={optionsIsActive}
                                            onChange={(selectedOption) => {
                                                setEditResp(prev => ({
                                                    ...prev,
                                                    is_active: selectedOption ? selectedOption.value : null
                                                }));
                                            }}
                                            value={optionsIsActive.find(opt => opt.value === editedResp.is_active) || null}
                                            placeholder="Активно"
                                            isClearable={false}
                                            name="is_active"
                                        />
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <textarea
                                        name="comment"
                                        className="form-control"
                                        value={editedResp?.comment}
                                        autoComplete="comment"
                                        placeholder="Примечание"
                                        style={{ minHeight: '120px', maxHeight: '120px', resize: 'vertical', overflowY: 'auto' }}
                                        onChange={onChangeEditResp}
                                    />
                                </div>

                                <div>
                                    <button
                                        className="btn btn-outline-primary"
                                        type="submit">
                                        Сохранить
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                    <div className="col-lg-6">
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
                                <span className="text-secondary">Последнее изменение</span>
                            </div>
                            <div className="mb-2">
                                <span className="text-secondary">Изменил</span>
                                <span> </span>
                            </div>
                            <div className="mb-2">
                                <span className="text-secondary">Активно</span>
                                <span> </span>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}