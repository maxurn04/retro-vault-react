import { adminApi } from './api';

class AdminService {
    async obtenerMetricasDashboard() {
        const response = await adminApi.get('/dashboard/metricas');
        return response.data;
    }

    async listarProductos() {
        const response = await adminApi.get('/productos');
        return response.data;
    }

    async obtenerProductoPorId(id) {
        const response = await adminApi.get(`/productos/${id}`);
        return response.data;
    }

    async crearProducto(producto) {
        const response = await adminApi.post('/productos', producto);
        return response.data;
    }

    async actualizarProducto(id, producto) {
        const response = await adminApi.put(`/productos/${id}`, producto);
        return response.data;
    }

    async eliminarProducto(id) {
        const response = await adminApi.delete(`/productos/${id}`);
        return response.data;
    }

    async obtenerProductosCriticos() {
        const response = await adminApi.get('/productos/criticos');
        return response.data;
    }

    async listarCategorias() {
        const response = await adminApi.get('/categorias');
        return response.data;
    }

    async crearCategoria(categoria) {
        const response = await adminApi.post('/categorias', categoria);
        return response.data;
    }

    async actualizarCategoria(id, categoria) {
        const response = await adminApi.put(`/categorias/${id}`, categoria);
        return response.data;
    }

    async eliminarCategoria(id) {
        const response = await adminApi.delete(`/categorias/${id}`);
        return response.data;
    }

    async listarUsuarios() {
        const response = await adminApi.get('/usuarios');
        return response.data;
    }

    async crearUsuario(usuario) {
        const response = await adminApi.post('/usuarios', usuario);
        return response.data;
    }

    async actualizarUsuario(id, usuario) {
        const response = await adminApi.put(`/usuarios/${id}`, usuario);
        return response.data;
    }

    async eliminarUsuario(id) {
        const response = await adminApi.delete(`/usuarios/${id}`);
        return response.data;
    }

    async listarHistorialCompras(usuarioId) {
        const response = await adminApi.get(`/usuarios/${usuarioId}/historial-compras`);
        return response.data;
    }

    async listarOrdenes() {
        const response = await adminApi.get('/ordenes');
        return response.data;
    }

    async obtenerOrdenPorNumero(numero) {
        const response = await adminApi.get(`/ordenes/numero/${numero}`);
        return response.data;
    }

    async actualizarOrden(id, orden) {
        const response = await adminApi.put(`/ordenes/${id}`, orden);
        return response.data;
    }

    async eliminarOrden(id) {
        const response = await adminApi.delete(`/ordenes/${id}`);
        return response.data;
    }
}

export default new AdminService();
