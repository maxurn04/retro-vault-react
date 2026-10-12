import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarCategorias from '../../views/admin/mostrarcategorias';

const producto = { id: 1, nombre: 'Zelda 64', stock: 5, precio: 30000, categoria: 'Juegos', img: '/z.jpg' };

const renderizar = () =>
    render(
        <MemoryRouter>
            <MostrarCategorias />
        </MemoryRouter>
    );

describe('vista admin de categorías', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('catalogo_retro', JSON.stringify([producto]));
        localStorage.setItem('categorias_retro', JSON.stringify(['Juegos', 'Vacia']));
    });

    it('muestra cada categoría con sus productos', () => {
        renderizar();
        expect(screen.getByText('Zelda 64')).toBeInTheDocument();
        expect(screen.getByText(/sin productos en esta categoría/i)).toBeInTheDocument();
    });

    it('deshabilita el botón Borrar si la categoría tiene productos', () => {
        renderizar();
        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        expect(botones[0]).toBeDisabled();
        expect(botones[1]).toBeEnabled();
    });

    it('pide confirmación con un modal antes de borrar y permite cancelar', () => {
        renderizar();
        fireEvent.click(screen.getAllByRole('button', { name: 'Borrar' })[1]);
        expect(screen.getByText(/¿seguro que deseas borrar la categoría "Vacia"/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(screen.queryByText(/¿seguro que deseas borrar/i)).not.toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('categorias_retro'))).toEqual(['Juegos', 'Vacia']);
    });

    it('borra la categoría vacía al confirmar', () => {
        renderizar();
        fireEvent.click(screen.getAllByRole('button', { name: 'Borrar' })[1]);
        const botonesModal = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botonesModal[botonesModal.length - 1]);
        expect(JSON.parse(localStorage.getItem('categorias_retro'))).toEqual(['Juegos']);
    });
});