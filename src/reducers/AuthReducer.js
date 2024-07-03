export default function authReducer(state, action) {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                authenticated: !!(action.payload),
                email: action.payload.email
            }
        default:
            return state;
    }
}