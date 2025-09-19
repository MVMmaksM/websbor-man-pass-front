import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toLocalISOString } from "../../../../utils/toLocalISOString.js";
import { CustomDatePicker } from "../../../../components/CustomDatePicker.jsx";
import { CustomSelect } from "../../../../components/CustomSelect.jsx";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { useNavigate } from "react-router-dom";
import { getUsersList, setFilter, clearFilter, getUsersRoles } from "../../../../store/users/usersSlice.js";

export const Filters = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultLocalStateFilter = {};
    //локальный стейт фильтров
    const [localStateFilter, setLocalStateFilter] = useState();
    //глобальный стейт фильтров
    const usersFilter = useSelector(state => state.users.usersFilter);
    //статус загрузки
    const getUsersListLS = useSelector(state => state.users.getUsersListLS);
    //роли
    const getUsersRolesLS = useSelector(state => state.users.getUsersRolesLS);
    const usersRoles = useSelector(state => state.users.usersRoles);
    //стейт для списка ролей
    const [userRoles, setUserRoles] = useState([]);


    //при монтировании
    useEffect(() => {
        setLocalStateFilter(usersFilter);
        //делаем запрос
        dispatch(getUsersList({ ...usersFilter }));
    }, []);

    //сброс фильтров
    const resetFilter = async () => {
        //чистим локальные фильтры
        setLocalStateFilter(defaultLocalStateFilter);
        //чистим фильтр в редаксе
        dispatch(clearFilter());
        //делаем запрос
        dispatch(getUsersList({ ...defaultLocalStateFilter }));
    }

    //отправка фильтров
    const submitFilter = async () => {
        //кладем в редакс локальные фильтры
        dispatch(setFilter(localStateFilter));
        //делаем запрос с локальными фильтрами
        dispatch(getUsersList({ ...localStateFilter }));
    }

    //изменение фильтров
    const onChangeFilter = (e) => {
        const { name, value } = e.target;

        setLocalStateFilter(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //после получения списка ролей пользователей
    useEffect(() => {
        if (usersRoles) {
            setUserRoles(usersRoles.map(r => {
                return {
                    value: r.role_id,
                    label: r.name
                }
            }))
        }
    }, [usersRoles]);

    //получение списка ролей
    const onMenuOpen = () => {
        if (getUsersRolesLS === LOADING_STATUS.IDLE)
            dispatch(getUsersRoles())
    }

    return (
        <>
            <div className="ms-3 mt-3 d-flex align-items-center gap-2">
                <button
                    style={{ border: 'none' }}
                    className="btn btn-outline p-0"
                    data-bs-placement="top"
                    title="Добавить пользователя"
                    onClick={() => { navigate("create") }}
                >
                    <i className="bi bi-plus-square fs-5 text-secondary"></i>
                </button>

                <a
                    style={{ border: 'none' }}
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
                                    id="login"
                                    name="login"
                                    type="text"
                                    className="form-control"
                                    autoComplete="login"
                                    placeholder="Логин"
                                    onChange={onChangeFilter}
                                    value={localStateFilter?.login || ""}
                                />                               
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={userRoles}
                                    onChange={(selectedOption) => {
                                        setLocalStateFilter(prev => ({
                                            ...prev,
                                            role_id: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={userRoles.find(opt => opt.value === localStateFilter?.role_id) || null}
                                    placeholder="Роль"
                                    onMenuOpen={onMenuOpen}
                                />
                            </div>
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
                                    selected={localStateFilter?.start_last_auth_on_tz ? new Date(localStateFilter?.start_last_auth_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, start_last_auth_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="start_last_auth_on_tz"
                                    placeholder="Дата последнего входа с"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={localStateFilter?.end_last_auth_on_tz ? new Date(localStateFilter?.end_last_auth_on_tz) : null}
                                    onChange={(date) => setLocalStateFilter(prev => ({ ...prev, end_last_auth_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="end_last_auth_on_tz"
                                    placeholder="Дата последнего входа по"
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