import { useEffect, useState } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";
import { createResp, clearCreateResp } from "../../../../store/resp/respSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { Spinner } from "../../../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../../../store/alert/alertSlice.js";
import { ALERT_TYPES } from "../../../../store/alert/alertTypes.js";
import { getOrganizaton, clearOrganization } from "../../../../store/gs/gsSlice.js";
import { usePrevious } from "../../../../hooks/usePrevious.jsx";

export const CreateRespForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [newResp, setNewResp] = useState({
        name: '',
        okpo: '',
        password: '',
        comment: '',
        is_active: true
    });
    const prevOkpo = usePrevious(newResp.okpo);
    const createRespLS = useSelector(state => state.resp.createRespLS);
    const createdResp = useSelector(state => state.resp.createdResp);
    //gs
    const getOrganizatonLS = useSelector(state => state.gs.getOrganizatonLS);
    const organization = useSelector(state => state.gs.organization);

    //успешно создано
    useEffect(() => {
        if (createRespLS === LOADING_STATUS.SUCCESS) {
            navigate(`/main/resp/${createdResp.resp_cred_id}`);
            dispatch(setAlert({ type: ALERT_TYPES.SUCCESS, message: "Запись успешно создана" }));
        }
    }, [createRespLS]);

    useEffect(() => {
        return () => {
            //чистим стейт создания
            dispatch(clearCreateResp());
            //чистим стейт организации
            dispatch(clearOrganization());
        };
    }, [])

    const onChangeCreateResp = (e) => {
        const { name, value } = e.target;

        setNewResp(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createResp(newResp));
    };

    //для активно
    const optionsIsActive = [
        { value: true, label: 'Да' },
        { value: false, label: 'Нет' }
    ];

    //получение инфы об организации
    //при потере фокуса с ОКПО
    const handleBlurOkpo = () => {
        //если предыдущее ОКПО отличается от текущего и 
        //текущее ОКПО не пустое
        if (prevOkpo !== newResp.okpo && newResp.okpo !== "")
            dispatch(getOrganizaton({ okpo: newResp.okpo }))
    }

    return (
        <>
            {createRespLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
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
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-2 col-12">
                                    <input
                                        name="name"
                                        type='text'
                                        className="form-control"
                                        value={newResp.name}
                                        autoComplete="name"
                                        placeholder="Наименование"
                                        onChange={onChangeCreateResp}
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
                                            value={newResp.okpo ?? ''}
                                            autoComplete="okpo"
                                            placeholder="ОКПО"
                                            onChange={onChangeCreateResp}
                                            onWheel={(e) => e.target.blur()}
                                            onBlur={handleBlurOkpo}
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="d-flex align-items-center">
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                name="password"
                                                value={newResp.password ?? ''}
                                                autoComplete="password"
                                                placeholder="Введите пароль"
                                                onChange={onChangeCreateResp}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={togglePassword}
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
                                            setNewResp(prev => ({
                                                ...prev,
                                                is_active: selectedOption ? selectedOption.value : null
                                            }));
                                        }}
                                        value={optionsIsActive.find(opt => opt.value === newResp.is_active) || null}
                                        placeholder="Активно"
                                        isClearable={false}
                                    />
                                </div>
                            </div>

                            <div className="mb-2">
                                <textarea
                                    name="comment"
                                    className="form-control"
                                    value={newResp.comment}
                                    autoComplete="comment"
                                    placeholder="Примечание"
                                    style={{ minHeight: '120px', maxHeight: '120px', resize: 'vertical', overflowY: 'auto' }}
                                    onChange={onChangeCreateResp}
                                />
                            </div>

                            <div>
                                <button
                                    className="btn btn-outline-primary"
                                    type="submit">
                                    Создать
                                </button>
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
                        <span className="text-center text-muted">
                            <h6>Данные о кодах статистики</h6>
                        </span>

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
                                <div className="text-center p-5">
                                    Данные не найдены
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}