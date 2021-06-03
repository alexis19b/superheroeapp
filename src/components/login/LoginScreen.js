import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {
    
    const lastPath = localStorage.getItem('lastPath') || '/';


    const { dispatch } = useContext(AuthContext); //Me permite madarle el dispatch para realizar la autenticacion

    const handleLogin = () => {
        //funcion que restringe el historial y no regresa atras
        // history.replace('/');
        //funcion que permite ir a cierto pagina al hacer click
        //history.push('/');
        const action = {
            type: types.login,
            payload:{name: 'Jesus'}
        }
        dispatch(action);
        history.replace(lastPath);
    }
    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}
