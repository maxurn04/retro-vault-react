import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarBoletas from '../../views/admin/mostrarboletas';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { listarOrdenes: vi.fn(), eliminarOrden: vi.fn() }
}));

const boleta = {
    id: 11,
    numero: '#20261012-1001',
    numeroOrden: '#20261012-1001',
    fecha: '2026-10-12T10:00:00',
    metodoPago: 'Mercado Pago',
    estado: 'PENDIENTE_PAGO',
    cliente: { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
    total: 60000
};

const renderizar = () =>
    render(
        <MemoryRouter>
            <MostrarBoletas />
        </MemoryRouter>
    );

describe('vista admin de boletas', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('muestra un mensaje cuando no hay boletas', async () => {
        AdminService.listarOrdenes.mockResolvedValue([]);
        renderizar();
        expect(await screen.findByText(/no hay boletas registradas/i)).toBeInTheDocument();
    });

    it('muestra los datos principales de cada boleta', async () => {
        AdminService.listarOrdenes.mockResolvedValue([boleta]);
        renderizar();
        expect(await screen.findByText('#20261012-1001')).toBeInTheDocument();
        expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
        expect(screen.getByText('CLP$60000')).toBeInTheDocument();
    });

    it('codifica el número de orden en los enlaces de ver y editar', async () => {
        AdminService.listarOrdenes.mockResolvedValue([boleta]);
        renderizar();
        const ver = await screen.findByRole('link', { name: 'Ver detalles' });
        expect(ver).toHaveAttribute('href', '/admin/boletas/%2320261012-1001');
        expect(screen.getByRole('link', { name: 'Editar' })).toHaveAttribute('href', '/admin/boletas/%2320261012-1001/editar');
    });

    it('borra la boleta en el backend solo después de confirmar en el modal', async () => {
        AdminService.listarOrdenes.mockResolvedValue([boleta]);
        AdminService.eliminarOrden.mockResolvedValue({ exito: true });
        renderizar();

        fireEvent.click(await screen.findByRole('button', { name: 'Borrar' }));
        expect(screen.getByText(/¿seguro que deseas borrar la boleta #20261012-1001/i)).toBeInTheDocument();
        expect(AdminService.eliminarOrden).not.toHaveBeenCalled();

        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botones[botones.length - 1]);
        await waitFor(() => expect(AdminService.eliminarOrden).toHaveBeenCalledWith(11));
        expect(await screen.findByText(/no hay boletas registradas/i)).toBeInTheDocument();
    });

    it('muestra el error del backend si la boleta no se puede borrar', async () => {
        AdminService.listarOrdenes.mockResolvedValue([{ ...boleta, estado: 'PAGADO' }]);
        AdminService.eliminarOrden.mockRejectedValue({ response: { data: { error: 'No se puede eliminar una orden en estado PAGADO' } } });
        renderizar();

        fireEvent.click(await screen.findByRole('button', { name: 'Borrar' }));
        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botones[botones.length - 1]);

        expect(await screen.findByText(/no se puede eliminar una orden en estado pagado/i)).toBeInTheDocument();
        expect(screen.getByText('#20261012-1001')).toBeInTheDocument();
    });
});
