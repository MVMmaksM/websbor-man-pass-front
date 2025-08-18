import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useEffect } from 'react';
import {fetchAuth} from "../../store/auth/authSlice"
import { useDispatch, useSelector } from 'react-redux'

export const AuthPage = () => {   
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabledBtn, setIsDisbaledBtn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [buttonText, setButtonText] = useState('Войти')

    const onLoginChanged = (e) => setLogin(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value); 
    const authStatus = useSelector(state => state.auth.status);
    const error = useSelector(state => state.auth.error)
    const dispatch = useDispatch();  

    const onAuthClick = async () =>{        
        dispatch(fetchAuth({password, login}))
        setIsDisbaledBtn(true)        
    }

    useEffect(()=>{
        document.title = 'Аутентификация'

        if(authStatus === 'in progress'){            
            //setIsDisbaledBtn(true)
            setErrorMessage('')
            setButtonText(<div class="spinner-border text-white" role="status"></div>)
        }
        else if(authStatus === 'success'){
            setIsDisbaledBtn(false)
            window.location = '/main'
            setButtonText("Войти")
        } else if(authStatus === 'fail'){   
            setErrorMessage(error?.message)
            setIsDisbaledBtn(false)
            setButtonText("Войти")
        }

    }, [authStatus, error, setIsDisbaledBtn])
    
    return (        
        <div className="container-fluid h-100 d-flex flex-column justify-content-center">        
            <div>
                <h3 className="text-center mt-3">Система хранения учетных данных респондентов</h3>
            </div>             
            <div style={{ marginTop: '25vh'}}>                   
                <div className="container">                       
                    <div className="row justify-content-center">                           
                        <div className="col-md-3">
                            <form>
                                <div className='mb-3 text-center'>
                                    <label htmlFor='login' className='form-label'>Логин</label>
                                    <input id='login' name='login' className='form-control' value={login} onChange={onLoginChanged}/>
                                </div>
                                <div className='mb-3 text-center'>
                                    <label htmlFor='password' className='form-label'>Пароль</label>
                                    <input id='password' type="password" name='password' className='form-control' value={password} onChange={onPasswordChanged}/>
                                </div>  
                                <p className="text-danger text-center">{errorMessage}</p>
                                <p className="text-center">
                                    <button className='btn btn-primary w-50' disabled={isDisabledBtn} type='button' onClick={onAuthClick}>{buttonText}</button>
                                </p>                 
                            </form>
                        </div>                        
                    </div>                   
                </div>                
            </div>            
        </div> 
           
    )
}