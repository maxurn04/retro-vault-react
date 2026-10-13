import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarCategoria from '../../views/admin/editarcategoria';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

describe('vista admin de editar categoría', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('categorias_retro', JSON.stringify(['Consolas', 'Juegos']));
        localStorage.setItem('catalogo_retro', JSON.stringify([
            { id: 1, nombre: 'Zelda 64', categoria: 'Juegos' },
            { id: 2, nombre: 'PlayStation 2', categoria: 'Consolas' }
        ]));
        navigateMock.mockClear();
    });

    it('renombra la categoría y actualiza también los productos que la usan', () => {
        render(
            <MemoryRouter initialEntries={['/admin/categorias/editar/Juegos']}>
                <Routes>
                    <Route path="/admin/categorias/editar/:nombre" element={<EditarCategoria />} />
                </Routes>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Videojuegos' } });
        fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));

        expect(JSON.parse(localStorage.getItem('categorias_retro'))).toEqual(['Consolas', 'Videojuegos']);
        const catalogo = JSON.parse(localStorage.getItem('catalogo_retro'));
        expect(catalogo[0].categoria).toBe('Videojuegos');
        expect(catalogo[1].categoria).toBe('Consolas');
        expect(navigateMock).toHaveBeenCalledWith('/admin/categorias');
    });
});