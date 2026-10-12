import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductosCriticos from '../../views/admin/productoscriticos';

const catalogo = [
    { id: 1, nombre: 'Consola Agotada', stock: 0, categoria: 'Consolas', img: '/a.jpg', precio: 1000 },
    { id: 2, nombre: 'Juego Ultima Unidad', stock: 1, categoria: 'Juegos', img: '/b.jpg', precio: 2000 },
    { id: 3, nombre: 'Mando Con Stock', stock: 10, categoria: 'Accesorios', img: '/c.jpg', precio: 3000 }
];

const renderizar = () =>
    render(
        <MemoryRouter>
            <ProductosCriticos />
        </MemoryRouter>
    );

describe('vista admin de productos críticos', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('lista solo los productos con stock menor a 2', () => {
        localStorage.setItem('catalogo_retro', JSON.stringify(catalogo));
        renderizar();
        expect(screen.getByText('Consola Agotada')).toBeInTheDocument();
        expect(screen.getByText('Juego Ultima Unidad')).toBeInTheDocument();
        expect(screen.queryByText('Mando Con Stock')).not.toBeInTheDocument();
    });

    it('muestra la etiqueta Agotado cuando el stock es 0', () => {
        localStorage.setItem('catalogo_retro', JSON.stringify(catalogo));
        renderizar();
        expect(screen.getByText('Agotado')).toBeInTheDocument();
    });

    it('muestra un mensaje cuando no hay productos críticos', () => {
        localStorage.setItem('catalogo_retro', JSON.stringify([catalogo[2]]));
        renderizar();
        expect(screen.getByText(/no hay productos con stock crítico/i)).toBeInTheDocument();
    });
});
