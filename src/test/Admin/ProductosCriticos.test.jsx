import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductosCriticos from '../../views/admin/productoscriticos';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { obtenerProductosCriticos: vi.fn() }
}));

const criticos = [
    { id: 1, nombre: 'Consola Agotada', stock: 0, categoria: { id: 1, nombre: 'Consolas' }, imagenUrl: '/a.jpg', precio: 1000 },
    { id: 2, nombre: 'Juego Ultima Unidad', stock: 1, categoria: { id: 2, nombre: 'Juegos' }, imagenUrl: '/b.jpg', precio: 2000 }
];

const renderizar = () =>
    render(
        <MemoryRouter>
            <ProductosCriticos />
        </MemoryRouter>
    );

describe('vista admin de productos críticos', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('lista los productos críticos que entrega el backend', async () => {
        AdminService.obtenerProductosCriticos.mockResolvedValue(criticos);
        renderizar();
        expect(await screen.findByText('Consola Agotada')).toBeInTheDocument();
        expect(screen.getByText('Juego Ultima Unidad')).toBeInTheDocument();
        expect(screen.getByText('Juegos')).toBeInTheDocument();
    });

    it('muestra la etiqueta Agotado cuando el stock es 0', async () => {
        AdminService.obtenerProductosCriticos.mockResolvedValue(criticos);
        renderizar();
        expect(await screen.findByText('Agotado')).toBeInTheDocument();
    });

    it('muestra un mensaje cuando no hay productos críticos', async () => {
        AdminService.obtenerProductosCriticos.mockResolvedValue([]);
        renderizar();
        expect(await screen.findByText(/no hay productos con stock crítico/i)).toBeInTheDocument();
    });
});