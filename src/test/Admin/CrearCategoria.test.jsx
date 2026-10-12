import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearCategoria from '../../views/admin/crearcategoria';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const renderizar = () =>
    render(
        <MemoryRouter>
            <CrearCategoria />
        </MemoryRouter>
    );

describe('vista admin de crear categoría', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('categorias_retro', JSON.stringify(['Juegos']));
        navigateMock.mockClear();
    });

    it('actualiza el valor del campo cuando el usuario escribe', () => {
        renderizar();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Retro' } });
        expect(input).toHaveValue('Retro');
    });

    it('rechaza una categoría repetida sin importar mayúsculas', () => {
        renderizar();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'juegos' } });
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(screen.getByText(/ya existe una categoría con ese nombre/i)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('categorias_retro'))).toEqual(['Juegos']);
        expect(navigateMock).not.toHaveBeenCalled();
    });

    it('guarda la nueva categoría y vuelve al listado', () => {
        renderizar();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Retro' } });
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(JSON.parse(localStorage.getItem('categorias_retro'))).toEqual(['Juegos', 'Retro']);
        expect(navigateMock).toHaveBeenCalledWith('/admin/categorias');
    });
});