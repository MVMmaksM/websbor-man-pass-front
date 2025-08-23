import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { fetchAuth, checkStatusAuth } from "../../store/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "../../components/Spinner"

export const AuthPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onLoginChanged = (e) => setLogin(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const fetchAuthLS = useSelector(state => state.auth.fetchAuthLS);
    const checkAuthLS = useSelector(state => state.auth.checkAuthLS)
    const authStatus = useSelector(state => state.auth?.authStatus?.isAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onAuthClick = async () => {
        dispatch(fetchAuth({ password, login }))
    }

    useEffect(() => {      
        if(checkAuthLS === 'idle')
            dispatch(checkStatusAuth());
       
        //если аутентифицирован, то редиректим с ауфа на маин
        if (authStatus)
            navigate('/main');

        if (fetchAuthLS === 'success')
            navigate('/main');

    }, [fetchAuthLS, checkStatusAuth, authStatus])

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Заголовок — вверху */}
            <h3 className="text-center mt-3">Система хранения учетных данных респондентов</h3>

            {/* Центральная часть — автоматически растягивается */}
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                {/* Форма */}
                <div style={{ maxWidth: '400px', width: '100%' }}>
                    <form>
                        <div className="mb-3 text-center">
                            <input
                                id="login"
                                name="login"
                                type="text"
                                className="form-control"
                                value={login}
                                onChange={onLoginChanged}
                                autoComplete="username"
                                placeholder="Введите логин"
                            />
                        </div>

                        <div className="mb-3 text-center">
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={onPasswordChanged}
                                    autoComplete="current-password"
                                    placeholder="Введите пароль"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? (
                                        <i className="bi bi-eye-fill"></i>
                                    ) : (
                                        <i className="bi bi-eye-slash-fill"></i>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                className="btn btn-primary w-50"
                                onClick={onAuthClick}
                                type="button"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
                {fetchAuthLS === 'in progress' ? <Spinner /> : ""}
            </div>
        </div>

    )
}