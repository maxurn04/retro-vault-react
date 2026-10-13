import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HistorialCompras from '../../views/admin/historialcompras';

const usuarios = [
    { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
    { nombre: 'Luis', apellidos: 'Soto', correo: 'luis@gmail.com' }
];

const boleta = (numero, correo, total) => ({
    numero, fecha: '12-10-2026', metodoPago: 'Mercado Pago',
    cliente: { nombre: 'X', apellidos: 'Y', correo }, productos: [], total
});

const renderizar = (indice) =>
    render(
        <MemoryRouter initialEntries={[`/admin/historial/${indice}`]}>
            <Routes>
                <Route path="/admin/historial/:indice" element={<HistorialCompras />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de historial de compras', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('lista_usuarios', JSON.stringify(usuarios));
    });

    it('muestra solo las compras del usuario y suma el total gastado', () => {
        localStorage.setItem('boletas', JSON.stringify([
            boleta(1001, 'ana@gmail.com', 60000),
            boleta(1002, 'ANA@gmail.com', 40000),
            boleta(2001, 'luis@gmail.com', 99999)
        ]));
        renderizar(0);
        expect(screen.getByText('1001')).toBeInTheDocument();
        expect(screen.getByText('1002')).toBeInTheDocument();
        expect(screen.queryByText('2001')).not.toBeInTheDocument();
        expect(screen.getByText('CLP$100000')).toBeInTheDocument();
    });

    it('muestra un mensaje cuando el usuario no tiene compras', () => {
        localStorage.setItem('boletas', JSON.stringify([boleta(1001, 'ana@gmail.com', 60000)]));
        renderizar(1);
        expect(screen.getByText(/aún no tiene compras/i)).toBeInTheDocument();
    });

    it('muestra un aviso cuando el usuario no existe', () => {
        renderizar(9);
        expect(screen.getByText(/usuario no encontrado/i)).toBeInTheDocument();
    });
});