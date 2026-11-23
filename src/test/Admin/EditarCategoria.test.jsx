import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarCategoria from '../../views/admin/editarcategoria';
import AdminService from '../../services/AdminService';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

vi.mock('../../services/AdminService', () => ({
    default: { buscarCategoriaPorNombre: vi.fn(), actualizarCategoria: vi.fn() }
}));

const renderizar = (nombre) =>
    render(
        <MemoryRouter initialEntries={[`/admin/categorias/editar/${nombre}`]}>
            <Routes>
                <Route path="/admin/categorias/editar/:nombre" element={<EditarCategoria />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de editar categoría', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('busca la categoría por nombre y la renombra en el backend', async () => {
        AdminService.buscarCategoriaPorNombre.mockResolvedValue({ id: 2, nombre: 'Juegos', descripcion: 'd' });
        AdminService.actualizarCategoria.mockResolvedValue({});
        renderizar('Juegos');
        await act(async () => {});
        expect(AdminService.buscarCategoriaPorNombre).toHaveBeenCalledWith('Juegos');

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Videojuegos' } });
        fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));

        await vi.waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/admin/categorias'));
        expect(AdminService.actualizarCategoria).toHaveBeenCalledWith(2, { id: 2, nombre: 'Videojuegos', descripcion: 'd' });
    });

    it('vuelve al listado si la categoría no existe', async () => {
        AdminService.buscarCategoriaPorNombre.mockRejectedValue({ response: { status: 404 } });
        renderizar('Nada');
        await vi.waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/admin/categorias'));
    });
});
