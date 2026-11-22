import { ordenesApi } from './api';

class OrdenesService {
    async procesarCompra(datosCompra) {
        const response = await ordenesApi.post('/compra', datosCompra);
        return response.data;
    }

    async procesarPago(ordenId, datosPago) {
        const response = await ordenesApi.post(`/compra/${ordenId}/pagar`, datosPago);
        return response.data;
    }

    async obtenerBoletas() {
        const response = await ordenesApi.get('/boletas');
        return response.data;
    }

    async obtenerBoletasPorUsuario(usuarioId) {
        const response = await ordenesApi.get(`/boletas/usuario/${usuarioId}`);
        return response.data;
    }

    async obtenerBoleta(numeroOrden) {
        try {
            const response = await ordenesApi.get(`/boletas/${numeroOrden}`);
            return response.data;
        } catch {
            const fallback = await ordenesApi.get(`/ordenes/${numeroOrden}`);
            return fallback.data;
        }
    }

    async obtenerCarrito(usuarioId) {
        const response = await ordenesApi.get(`/carrito/${usuarioId}`);
        return response.data;
    }

    async agregarAlCarrito(usuarioId, item) {
        const response = await ordenesApi.post(`/carrito/${usuarioId}`, item);
        return response.data;
    }

    async cambiarCantidad(usuarioId, productoId, cantidad) {
        const response = await ordenesApi.put(`/carrito/${usuarioId}/item/${productoId}`, { cantidad });
        return response.data;
    }

    async eliminarDelCarrito(usuarioId, productoId) {
        const response = await ordenesApi.delete(`/carrito/${usuarioId}/item/${productoId}`);
        return response.data;
    }

    async vaciarCarrito(usuarioId) {
        const response = await ordenesApi.delete(`/carrito/${usuarioId}`);
        return response.data;
    }
}

export default new OrdenesService();
