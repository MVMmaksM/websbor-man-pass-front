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

    const loginLS = useSelector(state => state.auth.loginLS);
    const isLogin = useSelector(state => state.auth?.loginStatus?.isLogin);

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
        if (checkAuthLS === LOADING_STATUS.IDLE)
            dispatch(checkAuth());

        //если аутентифицирован, то редиректим с ауфа на маин
        if (checkAuthStatus)
            navigate('/main');
        //если вернулось 200 и isLogin=== true
        //редиректим на main
        if (loginLS === LOADING_STATUS.SUCCESS && isLogin)
            navigate('/main');

    }, [loginLS, checkAuth, checkAuthStatus])

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
                {loginLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
            </div>
        </div>

    )
}