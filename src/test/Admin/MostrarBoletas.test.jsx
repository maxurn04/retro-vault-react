import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarBoletas from '../../views/admin/mostrarboletas';

const boleta = {
    numero: 1001,
    fecha: '12-10-2026',
    metodoPago: 'Mercado Pago',
    cliente: { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
    productos: [{ id: 1, nombre: 'PlayStation 2', cantidad: 1, precio: 60000, subtotal: 60000 }],
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
        localStorage.clear();
    });

    it('muestra un mensaje cuando no hay boletas', () => {
        renderizar();
        expect(screen.getByText(/no hay boletas registradas/i)).toBeInTheDocument();
    });

    it('muestra los datos principales de cada boleta', () => {
        localStorage.setItem('boletas', JSON.stringify([boleta]));
        renderizar();
        expect(screen.getByText('1001')).toBeInTheDocument();
        expect(screen.getByText('Ana Pérez')).toBeInTheDocument();
        expect(screen.getByText('CLP$60000')).toBeInTheDocument();
    });

    it('borra la boleta solo después de confirmar en el modal', () => {
        localStorage.setItem('boletas', JSON.stringify([boleta]));
        renderizar();

        fireEvent.click(screen.getByRole('button', { name: 'Borrar' }));
        expect(screen.getByText(/¿seguro que deseas borrar la boleta #1001/i)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('boletas'))).toHaveLength(1);

        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botones[botones.length - 1]);
        expect(JSON.parse(localStorage.getItem('boletas'))).toHaveLength(0);
        expect(screen.getByText(/no hay boletas registradas/i)).toBeInTheDocument();
    });
});