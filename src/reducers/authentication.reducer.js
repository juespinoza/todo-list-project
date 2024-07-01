import {SET_CURRENT_USER} from '../actions/autenticacion.action'

const isEmpty = obj => {
    return (Object.keys(obj).length === 0)
}

export default function(state , action ){
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}