import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarProductos from '../../views/admin/mostrarproductos';

const catalogo = [
    { id: 1, nombre: 'PlayStation 2', precio: 60000, stock: 4, img: '/ps2.jpg' },
    { id: 7, nombre: 'Super Mario 64', precio: 55000, stock: 10, img: '/sm64.jpg' }
];

describe('vista admin de mostrar productos', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('catalogo_retro', JSON.stringify(catalogo));
        render(<MemoryRouter><MostrarProductos /></MemoryRouter>);
    });

    it('lista cada producto del catálogo con su precio', () => {
        expect(screen.getByText('PlayStation 2')).toBeInTheDocument();
        expect(screen.getByText('CLP$60000')).toBeInTheDocument();
        expect(screen.getByText('Super Mario 64')).toBeInTheDocument();
        expect(screen.getByText('CLP$55000')).toBeInTheDocument();
    });

    it('cada botón Editar lleva a la página del producto correspondiente', () => {
        const enlaces = screen.getAllByRole('link', { name: 'Editar' });
        expect(enlaces[0]).toHaveAttribute('href', '/admin/editarprod/1');
        expect(enlaces[1]).toHaveAttribute('href', '/admin/editarprod/7');
    });
});
