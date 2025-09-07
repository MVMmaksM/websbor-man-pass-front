import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getRespList } from "../../../../store/resp/respSlice.js";
import { toLocalISOString } from "../../toLocalISOString.js";
import { CustomDatePicker } from "../../../../components/CustomDatePicker.jsx";
import { CustomSelect } from "../../../../components/CustomSelect.jsx";
import { getUsersList } from "../../../../store/users/usersSlice.js";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { useNavigate } from "react-router-dom";

export const Filters = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userFilter, setUserFilter] = useState([]);
    const [filter, setFilter] = useState({
        limit: 200,
        offset: 0,
        okpo: '',
        resp_cred_id: '',
        name: ''
    });

    //для фильтра активно
    const optionsIsActive = [
        { value: true, label: 'Да' },
        { value: false, label: 'Нет' }
    ];

    //для фильтра создал/изменил
    const users = useSelector(state => state.users.usersList);
    const getUsersListLS = useSelector(state => state.users.getUsersListLS);

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

    const onMenuOpen = () => {
        if (getUsersListLS === LOADING_STATUS.IDLE)
            dispatch(getUsersList())
    }

    const onChangeFilter = (e) => {
        const { name, value } = e.target;

        setFilter(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmitFilter = async () => {
        dispatch(getRespList(filter))
    }

    const onResetFilter = async () => {
        //в отдельную переменную
        //т.к. в диспатч уходят старые фильтры
        //ибо setFilter асинхронная
        const resetFilter = {
            limit: 200,
            offset: 0,
            okpo: '',
            resp_cred_id: '',
            name: '',
            is_active: null,
            start_created_on_tz: null,
            end_created_on_tz: null,
            start_updated_on_tz: null,
            end_updated_on_tz: null,
            created_by: null,
            updated_by: null
        }

        setFilter(resetFilter);
        dispatch(getRespList(resetFilter))
    }

    return (
        <>
            <div className="ms-3 mt-3 d-flex align-items-center gap-2">
                <button
                    className="btn btn-outline"
                    data-bs-placement="top"
                    title="Добавить"
                    onClick={()=>{navigate("create")}}
                >
                    <i className="bi bi-plus-square fs-5 text-secondary"></i>
                </button>

                <a
                    className="btn btn-outline"
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
                                    value={filter.okpo}
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
                                    value={filter.name}
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
                                    value={filter.resp_cred_id}
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={optionsIsActive}
                                    onChange={(selectedOption) => {
                                        setFilter(prev => ({
                                            ...prev,
                                            is_active: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={optionsIsActive.find(opt => opt.value === filter.is_active) || null}
                                    placeholder="Активно"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={userFilter}
                                    onChange={(selectedOption) => {
                                        setFilter(prev => ({
                                            ...prev,
                                            created_by: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={userFilter.find(opt => opt.value === filter.created_by) || null}
                                    placeholder="Создал"
                                    onMenuOpen={onMenuOpen}
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomSelect
                                    options={userFilter}
                                    onChange={(selectedOption) => {
                                        setFilter(prev => ({
                                            ...prev,
                                            updated_by: selectedOption ? selectedOption.value : null
                                        }));
                                    }}
                                    value={userFilter.find(opt => opt.value === filter.updated_by) || null}
                                    placeholder="Изменил"
                                    onMenuOpen={onMenuOpen}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={filter.start_created_on_tz ? new Date(filter.start_created_on_tz) : null}
                                    onChange={(date) => setFilter(prev => ({ ...prev, start_created_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="start_created_on_tz"
                                    placeholder="Дата создания с"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={filter.end_created_on_tz ? new Date(filter.end_created_on_tz) : null}
                                    onChange={(date) => setFilter(prev => ({ ...prev, end_created_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="end_created_on_tz"
                                    placeholder="Дата создания по"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={filter.start_updated_on_tz ? new Date(filter.start_updated_on_tz) : null}
                                    onChange={(date) => setFilter(prev => ({ ...prev, start_updated_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="start_updated_on_tz"
                                    placeholder="Дата изменения с"
                                />
                            </div>
                            <div className="col-lg-2">
                                <CustomDatePicker
                                    selected={filter.end_updated_on_tz ? new Date(filter.end_updated_on_tz) : null}
                                    onChange={(date) => setFilter(prev => ({ ...prev, end_updated_on_tz: date ? toLocalISOString(date) : date }))}
                                    name="end_updated_on_tz"
                                    placeholder="Дата изменения по"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <button
                                    className="btn btn-outline-primary me-3"
                                    onClick={onSubmitFilter}
                                >Применить</button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={onResetFilter}
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