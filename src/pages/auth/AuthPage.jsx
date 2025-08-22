import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { fetchAuth } from "../../store/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import {Spinner} from "../../components/Spinner"

export const AuthPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const onLoginChanged = (e) => setLogin(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const authStatus = useSelector(state => state.auth.status);
    const error = useSelector(state => state.auth.error)
    const dispatch = useDispatch();

    const onAuthClick = async () => {
        dispatch(fetchAuth({ password, login }))        
    }

    useEffect(() => {
        document.title = 'Аутентификация'

        if (authStatus === 'in progress') {       
            setErrorMessage('')            
        }
        else if (authStatus === 'success') {         
            //window.location = '/main'
        } else if (authStatus === 'fail') {
            setErrorMessage(error?.message)            
        }

    }, [authStatus, error])

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
                            <label htmlFor="login" className="form-label">Логин</label>
                            <input
                                id="login"
                                name="login"
                                type="text"
                                className="form-control"
                                value={login}
                                onChange={onLoginChanged}
                                autoComplete="username"
                            />
                        </div>

                        <div className="mb-3 text-center">
                            <label htmlFor="password" className="form-label">Пароль</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={onPasswordChanged}
                                autoComplete="current-password"
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-danger text-center mb-3">{errorMessage}</p>
                        )}

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
                {authStatus === 'in progress'? <Spinner /> : ""}
            </div>
        </div>

    )
}