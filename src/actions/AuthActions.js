export const setCurrentUser = (email) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: {
            email
        }
    };
};

export const loginUser = (user, dispatch) => {
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
