import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { loginUser } from '../actions/AuthActions';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showComponent, setShowComponent] = useState(false);
    const navigate = useNavigate();
    // Importar el contexto
    const context = useContext(AuthContext);
    useEffect(() =>{
        if(context.currentUser.authenticated === true) {
            navigate('/home');
        }
        setShowComponent(true);
    }, [context.currentUser.authenticated, navigate]);

    const handleSubmit = (e) => {
        console.log("login the user")
        e.preventDefault();
        if(email === "" || password === ""){
            setError("Datos incompletos")
        } else {
            context.dispatch(loginUser({ email, password }));
        }
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
