import { productosData } from './productos';

export const obtenerCatalogo = () => {
    const guardado = localStorage.getItem('catalogo_retro');
    if (guardado === null) {
        localStorage.setItem('catalogo_retro', JSON.stringify(productosData));
        return [...productosData];
    }
    return JSON.parse(guardado);
};

export const guardarCatalogo = (catalogo) => {
    localStorage.setItem('catalogo_retro', JSON.stringify(catalogo));
};