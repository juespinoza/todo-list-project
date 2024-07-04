// Las acciones que necesitamos construir y hacer accesibles en nuestra app:
// - set user = setear nuestro usuario
// - login user = llamada a la api para setear el usuario
// - logout user = borrar el token y borrar el current user (signica asignar valor nulo en current user)

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: {
            email: user.email
        }
    }
}