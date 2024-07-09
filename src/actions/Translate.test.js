import { logOutLink } from './Translate.js';

test('Retornar link en espanol', () => {
    expect(logOutLink('es-CO')).toBe('Log-out');
})