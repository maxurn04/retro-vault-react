import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleBoleta from '../../views/admin/detalleboleta';

const boleta = {
    numero: 1001,
    fecha: '12-10-2026',
    metodoPago: 'Mercado Pago',
    cliente: {
        nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com',
        calle: 'Calle 1', departamento: '', comuna: 'Santiago', region: 'Metropolitana', indicaciones: ''
    },
    productos: [{ id: 1, nombre: 'PlayStation 2', cantidad: 2, precio: 60000, subtotal: 120000 }],
    total: 120000
};

const renderizar = (editable) =>
    render(
        <MemoryRouter initialEntries={['/admin/boletas/1001']}>
            <Routes>
                <Route path="/admin/boletas/:numero" element={<DetalleBoleta editable={editable} />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de detalle de boleta', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('boletas', JSON.stringify([boleta]));
    });

    it('en modo ver los campos son de solo lectura y no hay botón de guardar', () => {
        renderizar(false);
        expect(screen.getByDisplayValue('Ana')).toHaveAttribute('readonly');
        expect(screen.getByRole('combobox')).toBeDisabled();
        expect(screen.queryByRole('button', { name: /guardar cambios/i })).not.toBeInTheDocument();
    });

    it('en modo editar los campos se pueden modificar y aparece el botón de guardar', () => {
        renderizar(true);
        expect(screen.getByDisplayValue('Ana')).not.toHaveAttribute('readonly');
        expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it('recalcula el subtotal y el total al cambiar la cantidad', () => {
        renderizar(true);
        expect(screen.getAllByText('CLP$120000')).toHaveLength(2);
        const [cantidad] = screen.getAllByRole('spinbutton');
        fireEvent.change(cantidad, { target: { value: '3' } });
        expect(screen.getAllByText('CLP$180000')).toHaveLength(2);
    });

    it('guarda los cambios de forma permanente en la lista de boletas', () => {
        renderizar(true);
        fireEvent.change(screen.getByDisplayValue('Ana'), { target: { value: 'Carla' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
        const guardadas = JSON.parse(localStorage.getItem('boletas'));
        expect(guardadas[0].cliente.nombre).toBe('Carla');
        expect(screen.getByText(/boleta actualizada con éxito/i)).toBeInTheDocument();
    });
});