import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleBoleta from '../../views/admin/detalleboleta';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { obtenerOrdenPorNumero: vi.fn(), actualizarOrden: vi.fn() }
}));

const boleta = {
    id: 11,
    numero: '#20261012-1001',
    numeroOrden: '#20261012-1001',
    fecha: '2026-10-12T10:00:00',
    metodoPago: 'Mercado Pago',
    estado: 'PAGADO',
    cliente: {
        nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com',
        calle: 'Calle 1', departamento: '', comuna: 'Santiago', region: 'Metropolitana', indicaciones: ''
    },
    productos: [{ id: 1, nombre: 'PlayStation 2', cantidad: 2, precio: 60000, subtotal: 120000 }],
    total: 120000
};

const renderizar = (editable) =>
    render(
        <MemoryRouter initialEntries={['/admin/boletas/%2320261012-1001']}>
            <Routes>
                <Route path="/admin/boletas/:numero" element={<DetalleBoleta editable={editable} />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de detalle de boleta', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.obtenerOrdenPorNumero.mockResolvedValue(boleta);
    });

    it('busca la orden por su número ya decodificado', async () => {
        renderizar(false);
        await screen.findByDisplayValue('Ana');
        expect(AdminService.obtenerOrdenPorNumero).toHaveBeenCalledWith('#20261012-1001');
    });

    it('en modo ver los campos son de solo lectura y no hay botón de guardar', async () => {
        renderizar(false);
        expect(await screen.findByDisplayValue('Calle 1')).toHaveAttribute('readonly');
        screen.getAllByRole('combobox').forEach((s) => expect(s).toBeDisabled());
        expect(screen.queryByRole('button', { name: /guardar cambios/i })).not.toBeInTheDocument();
    });

    it('en modo editar se puede cambiar la dirección, pero no los datos del cliente ni los productos', async () => {
        renderizar(true);
        expect(await screen.findByDisplayValue('Calle 1')).not.toHaveAttribute('readonly');
        expect(screen.getByDisplayValue('Ana')).toHaveAttribute('readonly');
        expect(screen.getByDisplayValue('PlayStation 2')).toHaveAttribute('readonly');
        expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it('guarda estado y dirección en el backend y muestra el aviso', async () => {
        AdminService.actualizarOrden.mockResolvedValue(boleta);
        const { container } = renderizar(true);
        fireEvent.change(await screen.findByDisplayValue('Calle 1'), { target: { value: 'Calle 99' } });
        fireEvent.change(container.querySelector('[name="estado"]'), { target: { value: 'DESPACHADO' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));

        expect(await screen.findByText(/boleta actualizada con éxito/i)).toBeInTheDocument();
        expect(AdminService.actualizarOrden).toHaveBeenCalledWith(11, expect.objectContaining({
            estado: 'DESPACHADO', calle: 'Calle 99', metodoPago: 'Mercado Pago'
        }));
    });

    it('muestra el error del backend si el cambio de estado no es válido', async () => {
        AdminService.actualizarOrden.mockRejectedValue({ response: { data: { error: 'No se puede cambiar el estado de PAGADO a ENTREGADO' } } });
        const { container } = renderizar(true);
        await screen.findByDisplayValue('Calle 1');
        fireEvent.change(container.querySelector('[name="estado"]'), { target: { value: 'ENTREGADO' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
        expect(await screen.findByText(/no se puede cambiar el estado/i)).toBeInTheDocument();
        expect(screen.queryByText(/boleta actualizada con éxito/i)).not.toBeInTheDocument();
    });

    it('muestra un aviso cuando la boleta no existe', async () => {
        AdminService.obtenerOrdenPorNumero.mockRejectedValue({ response: { status: 404 } });
        renderizar(false);
        expect(await screen.findByText(/boleta no encontrada/i)).toBeInTheDocument();
    });
});