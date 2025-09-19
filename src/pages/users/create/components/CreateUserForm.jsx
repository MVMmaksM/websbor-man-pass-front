import { useEffect, useState } from "react";
import { CustomSelect } from "../../../../components/CustomSelect";
import { createUser, clearCreateUser, getUsersRoles } from "../../../../store/users/usersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { Spinner } from "../../../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../../../store/alert/alertSlice.js";
import { ALERT_TYPES } from "../../../../store/alert/alertTypes.js";
import { RequiredFieldIndicator } from "../../../../components/RequiredFieldIndicator.jsx";

export const CreateUserForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //пароль
    const [showPassword, setShowPassword] = useState(false);
    //локальный стейь нового пользователя
    const [newUser, setNewUser] = useState({
        login: '',
        first_name: '',
        last_name: '',
        sur_name: '',
        password: '',
        role_id: null,
        cookie_expiration_time: null
    });
    //пользователь
    const createUserLS = useSelector(state => state.users.createUserLS);
    const createdUser = useSelector(state => state.users.createdUser);
    //роли
    const getUsersRolesLS = useSelector(state => state.users.getUsersRolesLS);
    const usersRoles = useSelector(state => state.users.usersRoles);
    //стейт для списка ролей
    const [userRoles, setUserRoles] = useState([]);

    //успешно создано
    useEffect(() => {
        if (createUserLS === LOADING_STATUS.SUCCESS) {
            navigate(`/main/admin/users`);
            dispatch(setAlert({ type: ALERT_TYPES.SUCCESS, message: "Пользователь успешно создан" }));
        }

        return () => {
            dispatch(clearCreateUser());
        };
    }, [createUserLS]);

    const onChangeCreateUser = (e) => {
        const { name, value } = e.target;

        //для кук число
        if (name === 'cookie_expiration_time') {
            console.log(newUser)
            setNewUser(prev => ({
                ...prev,
                [name]: value === "" ? null : Number(value)
            }));
        } else {
            setNewUser(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(newUser));
    };

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
            {createUserLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
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
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-2 col-lg-4">
                                    <span>Логин <RequiredFieldIndicator /></span>
                                    <input
                                        name="login"
                                        type='text'
                                        className="form-control"
                                        value={newUser.login}
                                        autoComplete="login"
                                        onChange={onChangeCreateUser}
                                    />
                                </div>

                                <div className="col-lg-4">
                                    <span>Пароль <RequiredFieldIndicator /></span>
                                    <div className="d-flex align-items-center">
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                name="password"
                                                value={newUser.password ?? ''}
                                                autoComplete="password"
                                                onChange={onChangeCreateUser}
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
                                    <span>Роль <RequiredFieldIndicator /></span>
                                    <CustomSelect
                                        options={userRoles}
                                        onChange={(selectedOption) => {
                                            setNewUser(prev => ({
                                                ...prev,
                                                role_id: selectedOption ? selectedOption.value : null
                                            }));
                                        }}
                                        value={userRoles.find(opt => opt.value === newUser.role_id) || null}
                                        placeholder="Роль"
                                        isClearable={false}
                                        onMenuOpen={onMenuOpen}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-2 col-lg-4">
                                    <span>Имя</span>
                                    <input
                                        name="first_name"
                                        type='text'
                                        className="form-control"
                                        value={newUser.first_name}
                                        autoComplete="first_name"
                                        onChange={onChangeCreateUser}
                                    />
                                </div>
                                <div className="mb-2 col-lg-4">
                                    <span>Фамилия</span>
                                    <input
                                        name="last_name"
                                        type='text'
                                        className="form-control"
                                        value={newUser.last_name}
                                        autoComplete="last_name"
                                        onChange={onChangeCreateUser}
                                    />
                                </div>
                                <div className="mb-2 col-lg-4">
                                    <span>Отчество</span>
                                    <input
                                        name="sur_name"
                                        type='text'
                                        className="form-control"
                                        value={newUser.sur_name}
                                        autoComplete="sur_name"
                                        onChange={onChangeCreateUser}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-2 col-lg-4">
                                    <span>Срок действия аутентификационной куки <RequiredFieldIndicator />                                        
                                        <span
                                            className="text-muted  ms-4"
                                            title={`Время действия аутентификационной куки - это время в минутах, 
в течение которого пользователю не нужно логиниться. Минимальное значение - 10 минут, максимальное - 10080 минут - это 7 дней`}>
                                            <i className="bi bi-info-circle"></i>
                                        </span>
                                    </span>
                                    <input
                                        name="cookie_expiration_time"
                                        type='number'
                                        className="form-control"
                                        value={newUser.cookie_expiration_time}
                                        autoComplete="cookie_expiration_time"
                                        onChange={onChangeCreateUser}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    className="btn btn-outline-primary"
                                    type="submit">
                                    Добавить
                                </button>
                            </div>
                        </form>

                    </div>
                </div >
            </div >
        </>
    )
}