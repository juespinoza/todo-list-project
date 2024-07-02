import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showComponent, setShowComponent] = useState(false);
    const jwt = localStorage.getItem('jwt');
    console.log("jwt", jwt);
    const navigate = useNavigate();
    useEffect(() =>{
        // accion para comprobar que existe el item jwt en el localStorage
        if(!jwt){
            // Si existe: renderizamos el componente
            setShowComponent(true);
            console.log('se queda aqui')
        } else {
            // Si No existe: redireccionamos a /login
            setShowComponent(false);
            console.log("lleva al home");
            // navigate('/');
        }
    }, []);

    const handleSubmit = (elemento) => {
        elemento.preventDefault();
        // envio del formulario
        // loguearle al usuario
        const path = 'http://localhost:3001/api/login';
        const body = {
            email,
            password
        }
        // enviar la consulta al servidor
        fetch(
            path, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if(data.ok === true){
                // recibir el token de la respuesta del servidor
                const token = data.token;
                console.log("El token es:", token);
                // guardar el token en el window.localStorage 
                localStorage.setItem('jwt', token);
                setError('');
                // una vez recibido esto redirigir a / -> Carga el componente Home
            } else {
                setError(data.error);
                setEmail('');
                setPassword('');
            }
        })
    }

    if(showComponent){
        return (
            <form onSubmit={handleSubmit}>
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
