import authApi from './api';

class AuthService {
    async login(correo, password) {
        const response = await authApi.post('/auth/login', { correo, password });
        return response.data;
    }

    async registro(usuarioData) {
        const response = await authApi.post('/auth/registro', usuarioData);
        return response.data;
    }

    async loginGoogle(credential, correo = null, nombre = null) {
        const payload = {
            credential: credential,
            token: credential,
            correo: correo,
            nombre: nombre
        };
        const response = await authApi.post('/auth/google', payload);
        return response.data;
    }

    async validarToken(token) {
        const response = await authApi.get('/auth/validar', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
}

export default new AuthService();
