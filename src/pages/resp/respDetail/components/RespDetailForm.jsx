import { useEffect, useState } from "react";
import {
    getRespPassword,
    clearGetRespPassword,
    editResp,
    getRespDetail,
    clearEditResp,
    clearDetailResp,
    getRespCredLog
} from "../../../../store/resp/respSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { Spinner } from "../../../../components/Spinner.jsx";
import { CustomSelect } from "../../../../components/CustomSelect.jsx";
import { setAlert } from "../../../../store/alert/alertSlice.js";
import { ALERT_TYPES } from "../../../../store/alert/alertTypes.js";
import { getOrganizaton, clearOrganization } from "../../../../store/gs/gsSlice.js";
import { usePrevious } from "../../../../hooks/usePrevious.jsx";

export const RespDetailForm = ({ resp_cred_id, isEdit, setIsEdit }) => {
    //пароль
    const [showPassword, setShowPassword] = useState(false);
    const respPassword = useSelector(state => state.resp.respPassword.password);
    const getRespPasswordLS = useSelector(state => state.resp.getRespPasswordLS);

    //детали
    const respDetail = useSelector(state => state.resp.respDetail);
    const getRespDetailLS = useSelector(state => state.resp.getRespDetailLS);

    //gs
    const getOrganizatonLS = useSelector(state => state.gs.getOrganizatonLS);
    const organization = useSelector(state => state.gs.organization);

    //пагинация логов
    const respCredLogPagination = useSelector(state => state.resp.respCredLogPagination);

    //обновление
    const editRespLS = useSelector(state => state.resp.editRespLS);
    const [editedResp, setEditResp] = useState({
        name: '',
        okpo: '',
        comment: '',
        is_active: null,
        password: null
    });

    const dispatch = useDispatch();

    //получаем детали
    useEffect(() => {
        dispatch(getRespDetail(resp_cred_id));
    }, []);

    //только после получения деталей 
    //дергаем gs
    useEffect(() => {
        if (getRespDetailLS === LOADING_STATUS.SUCCESS && respDetail.okpo && !organization)
            dispatch(getOrganizaton({ okpo: respDetail.okpo }));
    }, [getRespDetailLS]);

    //отображение пароля
    const togglePassword = () => {
        if (getRespPasswordLS === LOADING_STATUS.IDLE)
            dispatch(getRespPassword(respDetail.resp_cred_id));
        setShowPassword(!showPassword);
    };

    //очистка при размонтировании
    useEffect(() => {
        return () => {
            //очищаем стейт пароля
            dispatch(clearGetRespPassword());
            //очищаем стейт редактирования
            dispatch(clearEditResp());
            //очищаем стейт деталей
            dispatch(clearDetailResp());
            //очищаем стейт организации
            dispatch(clearOrganization());
        };
    }, [])

    //получен пароль - кладем его в локальный стейт
    useEffect(() => {
        if (getRespPasswordLS === LOADING_STATUS.SUCCESS)
            setEditResp(prev => ({
                ...prev,
                password: respPassword
            }));

    }, [getRespPasswordLS, respPassword]);

    //если редактируем
    //то копируем в локальный стейт
    useEffect(() => {
        if (isEdit)
            setEditResp(prev => ({
                ...prev,
                name: respDetail.name,
                okpo: respDetail.okpo,
                comment: respDetail.comment,
                is_active: respDetail.is_active,
                resp_cred_id: respDetail.resp_cred_id,
                password: respPassword
            }));
    }, [isEdit]);

    //изменение локального стейта при редактировании
    const onChangeEditResp = (e) => {
        const { name, value } = e.target;
        setEditResp(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editResp(editedResp));
    };

    //успешно отредактировано   
    useEffect(() => {
        if (editRespLS === LOADING_STATUS.SUCCESS) {
            //дергаем измененные детали
            dispatch(getRespDetail(resp_cred_id))
            //снимаем флаг редактирования
            setIsEdit(false);
            //прячем пароль
            setShowPassword(false);
            //очищаем стейт пароля
            dispatch(clearGetRespPassword());
            //очищаем стейт редактирования
            dispatch(clearEditResp());
            //алерт
            dispatch(setAlert({ type: ALERT_TYPES.SUCCESS, message: "Данные успешно обновлены" }));
            //получаем лог
            dispatch(getRespCredLog({ resp_cred_id, ...respCredLogPagination }));

            if (organization !== null && organization.okpo !== editedResp.okpo)
                dispatch(getOrganizaton({ okpo: editedResp.okpo }));
        }
    }, [editRespLS])

    //для активно
    const optionsIsActive = [
        { value: true, label: 'Да' },
        { value: false, label: 'Нет' }
    ];

    return (
        <>
            {
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
                                height: '100%'
                            }}
                        >
                            {getRespDetailLS === LOADING_STATUS.IN_PROGRESS &&
                                <Spinner color={'primary'}
                                    divStyle={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                        height: '100%'
                                    }}
                                    spinnerStyle={{ width: '30px', height: '30px' }} />}

                            <form onSubmit={handleSubmit}>
                                {getRespDetailLS === LOADING_STATUS.SUCCESS && respDetail &&
                                    <>
                                        <div className="row mb-3 mt-3">
                                            <div className="col">
                                                <span className="text-secondary">Наименование</span>
                                                {isEdit ?
                                                    <input
                                                        name="name"
                                                        type='text'
                                                        className="form-control"
                                                        value={editedResp.name}
                                                        autoComplete="name"
                                                        onChange={onChangeEditResp}
                                                    />
                                                    : <span> {respDetail.name ? respDetail.name : "Не указано"}</span>
                                                }
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-lg-3">
                                                <div className="d-flex align-items-center">
                                                    <span className="text-secondary me-2">ОКПО</span>

                                                    {isEdit ?
                                                        <input
                                                            name="okpo"
                                                            type="number"
                                                            className="form-control"
                                                            value={editedResp.okpo}
                                                            autoComplete="okpo"
                                                            onChange={onChangeEditResp}
                                                            onWheel={(e) => e.target.blur()}
                                                            min="0"
                                                        />
                                                        :
                                                        <>
                                                            <span> {respDetail.okpo ? respDetail.okpo : "Не указано"}</span>
                                                        </>}
                                                </div>
                                            </div>

                                            <div className="col-lg-3">
                                                <div className="d-flex align-items-center">
                                                    <span className="text-secondary me-2">Пароль</span>

                                                    {
                                                        getRespPasswordLS === LOADING_STATUS.IN_PROGRESS &&
                                                        <Spinner
                                                            color={'primary'}
                                                            divStyle={{
                                                                width: '90px',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                display: 'flex'
                                                            }}
                                                            spinnerStyle={{ width: '15px', height: '15px' }} />

                                                    }

                                                    {isEdit ?
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control text-center me-2"
                                                            name="password"
                                                            value={editedResp.password}
                                                            autoComplete="password"
                                                            onChange={onChangeEditResp}
                                                        />
                                                        :
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control-plaintext text-center me-2"
                                                            value={respPassword ?? 'password'}
                                                            disabled
                                                            autoComplete="off"
                                                            style={{ width: '90px', height: '24px' }}
                                                        />
                                                    }

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

                                            <div className="col-lg-3 d-flex flex-direction-row align-items-center">
                                                <span className="text-secondary me-2">Активно</span>
                                                {isEdit ?
                                                    <div style={{ width: '200px' }}>
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
                                                    : <span>{respDetail.is_active ? "Да" : "Нет"}</span>}

                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <div className="col">
                                                <span className="text-secondary me-1">Примечание</span>
                                                {isEdit ?

                                                    <textarea
                                                        name="comment"
                                                        className="form-control"
                                                        value={editedResp.comment}
                                                        autoComplete="comment"
                                                        style={{ minHeight: '120px', maxHeight: '120px', resize: 'vertical', overflowY: 'auto' }}
                                                        onChange={onChangeEditResp}
                                                    />
                                                    : <span> {respDetail.comment ? respDetail.comment : "Не указано"}</span>
                                                }
                                            </div>
                                        </div>
                                    </>
                                }


                                <div className="row mt-3">
                                    <div className="col-auto">
                                        {isEdit &&
                                            <>
                                                <button
                                                    className="btn btn-outline-primary me-2"
                                                    type="submit">
                                                    Сохранить
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => {
                                                        setIsEdit(false)
                                                        setShowPassword(false);
                                                    }}>
                                                    Отменить
                                                </button>
                                            </>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* данные из webstat*/}
                    <div className="col-lg-6">
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: '#EDEDED',
                                borderRadius: '6px',
                                minHeight: '70px',
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <div className="d-flex justify-content-center align-items-center w-100 text-muted" style={{ position: 'relative' }}>
                                <h6 className="mb-2">Данные о кодах статистики</h6>
                                <span className="mb-2" style={{ position: 'absolute', right: 0 }}>
                                    <button
                                        className="btn btn-outline p-0"
                                        style={{border: 'none'}}
                                        disabled = {getOrganizatonLS === LOADING_STATUS.SUCCESS && !organization}
                                        title="Скачать">
                                        <i class="bi bi-download"></i>
                                    </button>
                                </span>
                            </div>

                            {getOrganizatonLS === LOADING_STATUS.IN_PROGRESS &&
                                <Spinner color={'primary'}
                                    divStyle={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                        height: '100%'
                                    }}
                                    spinnerStyle={{ width: '30px', height: '30px' }} />}

                            {getOrganizatonLS === LOADING_STATUS.SUCCESS && organization &&
                                <>

                                    <div className="row mb-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">Полное наименование</span>
                                            <span> {organization?.full_name ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">Краткое наименование</span>
                                            <span> {organization?.short_name ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row g-3 mb-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКПО</span>
                                            <span> {organization?.okpo ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">ОГРН / ОГРНИП</span>
                                            <span> {organization?.ogrn ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">Дата регистрации</span>
                                            <span> {organization?.date_reg ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">ИНН</span>
                                            <span> {organization?.inn ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3 g-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКАТО фактический</span>
                                            <span> {organization?.okato_fact ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКАТО регистрации</span>
                                            <span> {organization?.okato_reg ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3 g-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКТМО фактический</span>
                                            <span> {organization?.oktmo_fact ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКТМО регистрации</span>
                                            <span> {organization?.oktmo_reg ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3 g-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКОГУ</span>
                                            <span> {organization?.okogu ?? "Не найдено"}</span>
                                        </div>
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКФС</span>
                                            <span> {organization?.okfs ?? "Не найдено"}</span>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-auto">
                                            <span className="text-secondary">ОКОПФ</span>
                                            <span> {organization?.okopf ?? "Не найдено"}</span>
                                        </div>
                                    </div>
                                </>}

                            {getOrganizatonLS === LOADING_STATUS.SUCCESS && !organization &&
                                <>
                                    <div className="text-center p-5 text-muted">
                                        Данные не найдены
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}