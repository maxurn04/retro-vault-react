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

export const obtenerCategorias = () => {
    const guardado = localStorage.getItem('categorias_retro');
    if (guardado === null) {
        const iniciales = [...new Set(obtenerCatalogo().map((p) => p.categoria).filter(Boolean))];
        localStorage.setItem('categorias_retro', JSON.stringify(iniciales));
        return iniciales;
    }
    return JSON.parse(guardado);
};

export const guardarCategorias = (categorias) => {
    localStorage.setItem('categorias_retro', JSON.stringify(categorias));
};