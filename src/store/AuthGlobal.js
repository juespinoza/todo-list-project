import React, {useReducer, useEffect, useState} from "react";
// importamos nuestro reducer y nuestro action
import authReducer from '../reducers/authentication.reducer';
import setCurrentUser from '../actions/authentication.action';
import AuthGlobal from './AuthGlobal';
import jwt_decode from jwt_decode;

const Auth = props => {
    // Traemos los valores del store
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    })

    const [showChildren, setShowChildren] = useState(false);

    // Verificamos y decodificamos el token guardado en el localStorage
    // Y actualizamos el store setCurrentUser
    useEffect(() => {
        if(localStorage.jwt){
            const decoded = localStorage.jwt ? localStorage.jwt : "";
            dispatch(setCurrentUser(jwt_decode(decoded)));
        }
        setShowChildren(true);
    }, [])

    if(!showChildren){
        return null;
    } else {
        return (
            <AuthGlobal.Provider 
              value={{ stateUser, dispatch }}>
                {props.children}
            </AuthGlobal.Provider>
        )
    }

}

export default AuthGlobal;

