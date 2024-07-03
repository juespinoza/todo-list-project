import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/AuthActions';
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
    const { user, dispatch } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    // const [user, setUser] = useState({});
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showComponent, setShowComponent] = useState(false);
    // const jwt = localStorage.getItem('jwt');
    // console.log("jwt", jwt);
    const navigate = useNavigate();
    useEffect(() =>{
        // accion para comprobar que existe el item jwt en el localStorage
        if(user.authenticated === true){
            // Si existe: renderizamos el componente
            setShowComponent(true);
        } else {
            // Si No existe: redireccionamos a /login
            setShowComponent(false);
            navigate('/home');
        }
    }, [jwt]);

    const handleSubmit = (elemento) => {
        elemento.preventDefault();
        // envio del formulario
        // loguearle al usuario
        loginUser(user, dispatch);
    }

    if(showComponent){
        return (
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <p className='error'>{(error)?error:''}</p>
                <input 
                type="email" 
                name="email" 
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                <input 
                type="submit" 
                value="Login" 
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'/>
            </form>
        )
    } else { return null; }
}

export default LoginForm;
