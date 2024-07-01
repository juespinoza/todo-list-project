import jwt_decode from jwt_decode;
export const SET_CURRENT_USER = "SET_CURRENT_USER";

/*
** Tendremos 3 acciones:
** - loginUser: para hacer login del sistema consultando a una API
** - logoutUser: para desloguearnos del sistema
** - setCurrentUser: para setear en token decodificado en el estado global. 
*/

export const loginUser = (user, dispatch, seterror) => {
    fetch("http://localhost:3001/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok === true) {
            const token = data.token;
            localStorage.setItem("jwt", token);
            const decoded = jwt_decode(token);
            seterror("")
            dispatch(setCurrentUser(decoded));
          } else {
            seterror(data.err.message)
            logoutUser(dispatch);
          }
        })
        .catch(err => {
          logoutUser(dispatch);
        });
}

export const setCurrentUser = decoded => {
    // si el usuario hace login, setear datos del usuario 
    // retornamos el tipo de accion y payload para que podemos comunicarnos con el reducer
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
  
export const logoutUser = (dispatch) => {
    //logout del usuario
    localStorage.removeItem("jwt");
    dispatch(setCurrentUser({}));
};