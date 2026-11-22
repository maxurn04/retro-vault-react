import { catalogoApi } from './api';

class CatalogoService {
    async obtenerProductos(buscar = null, categoria = null) {
        const params = {};
        if (buscar) params.buscar = buscar;
        if (categoria) params.categoria = categoria;
        const response = await catalogoApi.get('/productos', { params });
        return response.data;
    }

    async obtenerProductoPorId(id) {
        const response = await catalogoApi.get(`/productos/${id}`);
        return response.data;
    }

    async obtenerOfertas() {
        const response = await catalogoApi.get('/productos/ofertas');
        return response.data;
    }

    async obtenerPorCategoria(categoriaId) {
        const response = await catalogoApi.get(`/productos/categoria/${categoriaId}`);
        return response.data;
    }

    async obtenerRelacionados(id) {
        const response = await catalogoApi.get(`/productos/${id}/relacionados`);
        return response.data;
    }

    async obtenerCategorias() {
        const response = await catalogoApi.get('/categorias');
        return response.data;
    }

    async obtenerCategoriaPorId(id) {
        const response = await catalogoApi.get(`/categorias/${id}`);
        return response.data;
    }

    async obtenerBlogs() {
        const response = await catalogoApi.get('/blogs');
        return response.data;
    }

    async obtenerBlogPorId(id) {
        const response = await catalogoApi.get(`/blogs/${id}`);
        return response.data;
    }
}

export default new CatalogoService();
