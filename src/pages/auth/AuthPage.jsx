import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { authLogin, checkAuth } from "../../store/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "../../components/Spinner"
import { LOADING_STATUS } from "../../constants/loadingStatus";

export const AuthPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onLoginChanged = (e) => setLogin(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const authLS = useSelector(state => state.auth.authLS);
    const isAuth = useSelector(state => state.auth?.isAuth?.isAuth);

    const checkAuthLS = useSelector(state => state.auth.checkAuthLS)
    const checkAuthStatus = useSelector(state => state.auth?.checkAuthStatus?.isAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onLoginClick = async () => {
        dispatch(authLogin({ password, login }))
    }

    useEffect(() => {
        dispatch(checkAuth());
    }, [])

    useEffect(() => {
        //проверяем статус аутентификации, если ок, то редиректим на main
        if (checkAuthLS === LOADING_STATUS.SUCCESS && isAuth)
            navigate('/main');
        //если вернулось 200 и isAuth=== true
        //редиректим на main     
        if (authLS === LOADING_STATUS.SUCCESS && isAuth)
            navigate('/main');
    }, [isAuth])

    return (
        <div className="d-flex flex-column min-vh-100">
            <h3 className="text-center mt-3">Система хранения учетных данных респондентов</h3>
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">

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
                                    autoComplete="password"
                                    placeholder="Введите пароль"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? (
                                        <i className=" bi bi-eye-slash-fill"></i>
                                    ) : (
                                        <i className="bi bi-eye-fill"></i>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                className="btn btn-primary w-50"
                                onClick={onLoginClick}
                                type="button"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
                {authLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
            </div>
        </div>

    )
}