import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toLocalISOString } from "../../../../utils/toLocalISOString.js";
import { CustomDatePicker } from "../../../../components/CustomDatePicker.jsx";
import { CustomSelect } from "../../../../components/CustomSelect.jsx";
import { getUsersList } from "../../../../store/users/usersSlice.js";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { useNavigate } from "react-router-dom";
import { getRespList, setFilter, clearFilter, clearPagination } from "../../../../store/resp/respSlice.js";

export const Filters = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultLocalStateFilter = {};
    const defaultStatePagination = {
        limit: 200,
        offset: 0
    };
    //локальный стейт фильтров
    const [localStateFilter, setLocalStateFilter] = useState();
    //глобальный стейт фильтров
    const respFilter = useSelector(state => state.resp.respFilter);
    //стейт для списка пользователей
    const [userFilter, setUserFilter] = useState([]);
    //для фильтра создал/изменил
    const users = useSelector(state => state.users.usersList);
    const getUsersListLS = useSelector(state => state.users.getUsersListLS);
    //пагинация
    const pagination = useSelector(state => state.resp.pagination);

    //при монтировании
    useEffect(() => {
        setLocalStateFilter(respFilter);
        //делаем запрос
        dispatch(getRespList({ ...respFilter, ...pagination }));
    }, []);

    //сброс фильтров
    const resetFilter = async () => {
        //сброс пагинации  
        dispatch(clearPagination());
        //чистим локальные фильтры
        setLocalStateFilter(defaultLocalStateFilter);
        //чистим фильтр в редаксе
        dispatch(clearFilter());
        //делаем запрос
        dispatch(getRespList({ ...defaultLocalStateFilter, ...defaultStatePagination }));
    }

    //отправка фильтров
    const submitFilter = async () => {
        //сброс пагинации  
        dispatch(clearPagination());
        //кладем в редакс локальные фильтры
        dispatch(setFilter(localStateFilter));
        //делаем запрос с локальными фильтрами
        dispatch(getRespList({ ...localStateFilter, ...defaultStatePagination }));
    }

    //изменение фильтров
    const onChangeFilter = (e) => {
        const { name, value } = e.target;

        setLocalStateFilter(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //для фильтра активно
    const optionsIsActive = [
        { value: true, label: 'Да' },
        { value: false, label: 'Нет' }
    ];

    //после получения списка пользователей
    useEffect(() => {
        if (users) {
            setUserFilter(users.map(u => {
                return {
                    value: u.user_id,
                    label: u.login
                }
            }))
        }
    }, [users])

    //получение списка пользователей
    const onMenuOpen = () => {
        if (getUsersListLS === LOADING_STATUS.IDLE)
            dispatch(getUsersList())
    }

    return (
        <>
            <div className="ms-3 mt-3 d-flex align-items-center gap-2">
                <button
                    style={{border: 'none'}}
                    className="btn btn-outline p-0"
                    data-bs-placement="top"
                    title="Добавить респондента"
                    onClick={() => { navigate("create") }}
                >
                    <i className="bi bi-plus-square fs-5 text-secondary"></i>
                </button>

                <a
                    style={{border: 'none'}}
                    className="btn btn-outline p-0 ms-3"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    data-bs-placement="top"
                    title="Фильтры"
                >
                    <i className="bi bi-filter fs-5"></i>
                </a>
            </div>
            <div className="collapse mt-3" id="collapseExample">
                <div className="container-fluid">
                    <div className="card-body bg-light">
                        <div className="row">
                            <div className="col-lg-2">
                                <input
                                    id="okpo"
                                    name="okpo"
                                    type="number"
                                    className="form-control"
                                    autoComplete="okpo"
                                    placeholder="ОКПО"
                                    onChange={onChangeFilter}
                                    onWheel={(e) => e.target.blur()}
                                    min="0"
                                    value={localStateFilter?.okpo || ""}
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    autoComplete="name"
                                    placeholder="Наименование респондента"
                                    onChange={onChangeFilter}
                                    value={localStateFilter?.name || ""}
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="resp_cred_id"
                                    name="resp_cred_id"
                                    type="number"
                                    className="form-control"
                                    autoComplete="resp_cred_id"
                                    placeholder="Номер респондента"
                                    onWheel={(e) => e.target.blur()}
                                    min="0"
                                    onChange={onChangeFilter}
                                    value={localStateFilter?.resp_cred_id || ""}
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={optionsIsActive}
                                    onChange={(selectedOption) => {
                                        setLocalStateFilter(prev => ({
                                            ...prev,
                                            is_active: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={optionsIsActive.find(opt => opt.value === localStateFilter?.is_active) || null}
                                    placeholder="Активно"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={userFilter}
                                    onChange={(selectedOption) => {
                                        setLocalStateFilter(prev => ({
                                            ...prev,
                                            created_by: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={userFilter.find(opt => opt.value === localStateFilter?.created_by) || null}
                                    placeholder="Создал"
                                    onMenuOpen={onMenuOpen}
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={userFilter}
                                    onChange={(selectedOption) => {
                                        setLocalStateFilter(prev => ({
                                            ...prev,
                                            updated_by: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={userFilter.find(opt => opt.value === localStateFilter?.updated_by) || null}
                                    placeholder="Изменил"
                                    onMenuOpen={onMenuOpen}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={localStateFilter?.start_created_on_tz ? new Date(localStateFilter?.start_created_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, start_created_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="start_created_on_tz"
                                    placeholder="Дата создания с"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={localStateFilter?.end_created_on_tz ? new Date(localStateFilter?.end_created_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, end_created_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="end_created_on_tz"
                                    placeholder="Дата создания по"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={localStateFilter?.start_updated_on_tz ? new Date(localStateFilter?.start_updated_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, start_updated_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="start_updated_on_tz"
                                    placeholder="Дата изменения с"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={localStateFilter?.end_updated_on_tz ? new Date(localStateFilter?.end_updated_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, end_updated_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="end_updated_on_tz"
                                    placeholder="Дата изменения по"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <button
                                    className="btn btn-outline-primary me-3"
                                    onClick={submitFilter}
                                >Применить</button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={resetFilter}
                                >Очистить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}