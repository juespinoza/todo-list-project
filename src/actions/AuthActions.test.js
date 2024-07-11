import { logoutUser } from "./AuthActions";

describe('AuthActions', () => {
    test('logout exitoso', () => {
        expect(logoutUser()).toBe({
            type: 'SET_CURRENT_USER',
            payload: {
                email: ''
            }
        })
    });

})