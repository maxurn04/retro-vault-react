import axios from 'axios';

export const API_URLS = {
    AUTH: 'http://localhost:8081/api',
    CATALOGO: 'http://localhost:8082/api',
    ORDENES: 'http://localhost:8083/api',
    ADMIN: 'http://localhost:8084/api/v1/admin',
    CONTACTO: 'http://localhost:8085/api/v1'
};

const crearClienteConJwt = (baseURL) => {
    const cliente = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    cliente.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token_jwt');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return cliente;
};

export const authApi = crearClienteConJwt(API_URLS.AUTH);
export const catalogoApi = crearClienteConJwt(API_URLS.CATALOGO);
export const ordenesApi = crearClienteConJwt(API_URLS.ORDENES);
export const adminApi = crearClienteConJwt(API_URLS.ADMIN);
export const contactoApi = crearClienteConJwt(API_URLS.CONTACTO);

export default authApi;
