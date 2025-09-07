import { useEffect, useState } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";
import { createResp, clearCreateResp } from "../../../../store/resp/respSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { Spinner } from "../../../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";

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
    const createRespLS = useSelector(state => state.resp.createRespLS);
    const createdResp = useSelector(state => state.resp.createdResp);

    useEffect(() => {
        if (createRespLS === LOADING_STATUS.SUCCESS)
            navigate(`/main/resp/${createdResp.resp_cred_id}`);

        return () => {
            dispatch(clearCreateResp());
        };
    }, [createRespLS]);

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
                                        isClearable = {false}
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
            </div>
        </>
    )
}