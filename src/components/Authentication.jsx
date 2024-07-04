import React, { useEffect, useReducer } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import authReducer from '../reducers/authReducer'


const Authentication = props => {
  const initialValue = { 
    authenticated: false,
    email: ''
  }
  const [currentUser, dispatch] = useReducer(authReducer, initialValue);

  useEffect(()=>{
    // Tomar el token del localStorage
    const token = localStorage.getItem('jwt');
    if(token){
      // Decodificar el token para obtener el email. jwt-decode

      // Enviar el email al reducer para actualizar el estado
    }
  }, [])

  if (currentUser.authenticated) {
    return <div>Usuario no autenticado</div>;
  } else
  return (
    <AuthContext.Provider value={currentUser}>
        {props.children}
    </AuthContext.Provider>

  )
}

export default Authentication;
