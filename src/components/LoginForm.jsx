import React, { useState, useContext, useEffect } from 'react';
import AuthGlobal from '../store/AuthGlobal';

const LoginForm = props => {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        if (context.stateUser.isAuthenticated !== true) {
        props.history.push("/login");
        }
        setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);
    const [user, setUser] = useState({});

    const handleSubmit = e => {
        const user = { email: '', password: '' };
        if (email === "" || password === "") {
           seterror("Ingrese datos correctamente");
        } else {
         loginUser(user, context.dispatch, seterror);
        }
        e.preventDefault();
      };

    return (
        <form className='login' onSubmit={handleSubmit}>
            <input
                type='text' 
                value={user.email} 
                onChange={(element) => setUser({...user, email: element.target.value}) }
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            
            <input
                type='password' 
                value={user.password} 
                onChange={(element) => setUser({...user, password: element.target.value}) }
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            <button
                type='submit'
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                >Login</button>
        </form>
    )
}

export default LoginForm;
