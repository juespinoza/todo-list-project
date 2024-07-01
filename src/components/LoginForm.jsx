import React, { useState, useContext, useEffect } from 'react';
import AuthGlobal from '../store/AuthGlobal';


const LoginForm = props => {
    const context = useContext(AuthGlobal);
    const [showChild, setShowChild] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (context.stateUser.isAuthenticated !== true) {
        props.history.push("/login");
        }
        setShowChild(true);
    }, [context.stateUser.isAuthenticated, props.history]);

    const handleSubmit = e => {
        const user = { email, password };
        if (email === "" || password === "") {
           seterror("Ingrese datos correctamente");
        } else {
         loginUser(user, context.dispatch, seterror);
        }
        e.preventDefault();
      };
    
    if(!showChild) {
        return null;
    } else {
        return (
            <form className='login' onSubmit={handleSubmit}>
                <input
                    type='text' 
                    value={email} 
                    onChange={(element) => setEmail(element.target.value) }
                    className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                
                <input
                    type='password' 
                    value={password} 
                    onChange={(element) => setPassword(element.target.value) }
                    className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                <button
                    type='submit'
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    >Login</button>
            </form>
        )
    }
}

export default LoginForm;
