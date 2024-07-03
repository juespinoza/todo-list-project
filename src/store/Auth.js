import React, { createContext, useReducer } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Auth = props => {
    // const [user, dispatch] = useReducer(authReducer, {
    //     authenticated: null,
    //     data: {}
    // })

    return(
        <AuthContext.Provider>
            <p></p>
        </AuthContext.Provider>
    )
}

export default Auth;