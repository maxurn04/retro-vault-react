import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HistorialCompras from '../../views/admin/historialcompras';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { listarUsuarios: vi.fn(), listarHistorialCompras: vi.fn() }
}));

const usuarios = [
    { id: 1, nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
    { id: 2, nombre: 'Luis', apellidos: 'Soto', correo: 'luis@gmail.com' }
];

const orden = (id, numeroOrden, total) => ({ id, numeroOrden, fecha: '2026-10-12T10:00:00', metodoPago: 'Mercado Pago', total });

const renderizar = (id) =>
    render(
        <MemoryRouter initialEntries={[`/admin/historial/${id}`]}>
            <Routes>
                <Route path="/admin/historial/:indice" element={<HistorialCompras />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de historial de compras', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.listarUsuarios.mockResolvedValue(usuarios);
    });

    it('muestra las compras del usuario y suma el total gastado', async () => {
        AdminService.listarHistorialCompras.mockResolvedValue([orden(1, 'ORD-1001', 60000), orden(2, 'ORD-1002', 40000)]);
        renderizar(1);
        expect(await screen.findByText('ORD-1001')).toBeInTheDocument();
        expect(screen.getByText('ORD-1002')).toBeInTheDocument();
        expect(screen.getByText('CLP$100000')).toBeInTheDocument();
        expect(AdminService.listarHistorialCompras).toHaveBeenCalledWith(1);
    });

    it('muestra un mensaje cuando el usuario no tiene compras', async () => {
        AdminService.listarHistorialCompras.mockResolvedValue([]);
        renderizar(2);
        expect(await screen.findByText(/aún no tiene compras/i)).toBeInTheDocument();
    });

    it('muestra un aviso cuando el usuario no existe', async () => {
        renderizar(9);
        expect(await screen.findByText(/usuario no encontrado/i)).toBeInTheDocument();
    });
});