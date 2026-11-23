import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearCategoria from '../../views/admin/crearcategoria';
import AdminService from '../../services/AdminService';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

vi.mock('../../services/AdminService', () => ({
    default: { crearCategoria: vi.fn() }
}));

const renderizar = () =>
    render(
        <MemoryRouter>
            <CrearCategoria />
        </MemoryRouter>
    );

describe('vista admin de crear categoría', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('actualiza el valor del campo cuando el usuario escribe', () => {
        renderizar();
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Retro' } });
        expect(input).toHaveValue('Retro');
    });

    it('muestra el error del backend cuando la categoría ya existe', async () => {
        AdminService.crearCategoria.mockRejectedValue({ response: { data: { error: 'Ya existe una categoría con el nombre juegos' } } });
        renderizar();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'juegos' } });
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(await screen.findByText(/ya existe una categoría con el nombre/i)).toBeInTheDocument();
        expect(navigateMock).not.toHaveBeenCalled();
    });

    it('guarda la nueva categoría y vuelve al listado', async () => {
        AdminService.crearCategoria.mockResolvedValue({ id: 3, nombre: 'Retro' });
        renderizar();
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Retro' } });
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        await vi.waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/admin/categorias'));
        expect(AdminService.crearCategoria).toHaveBeenCalledWith({ nombre: 'Retro' });
    });
});