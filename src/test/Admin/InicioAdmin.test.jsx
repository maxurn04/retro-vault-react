import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InicioAdmin from '../../views/admin/inicioadmin';

describe('vista admin del dashboard', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('catalogo_retro', JSON.stringify([
            { id: 1, nombre: 'A', stock: 5 },
            { id: 2, nombre: 'B', stock: 10 },
            { id: 3, nombre: 'C', stock: 15 }
        ]));
        localStorage.setItem('lista_usuarios', JSON.stringify([{ run: '1' }, { run: '2' }]));
    });

    it('muestra la cantidad de productos y el inventario total del catálogo', () => {
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('muestra la cantidad de usuarios registrados', () => {
        render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('muestra 0 en productos, inventario y usuarios cuando no hay datos guardados', () => {
    localStorage.setItem('catalogo_retro', JSON.stringify([]));
    localStorage.setItem('lista_usuarios', JSON.stringify([]));
    render(<MemoryRouter><InicioAdmin /></MemoryRouter>);
    expect(screen.getAllByText('0')).toHaveLength(3);
    });
});