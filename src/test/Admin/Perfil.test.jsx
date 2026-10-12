import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfil from '../../views/admin/perfil';
import { ProveedorUsuario } from '../../contexto/ContextoUsuario';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const renderizar = () =>
    render(
        <ProveedorUsuario>
            <MemoryRouter>
                <Perfil />
            </MemoryRouter>
        </ProveedorUsuario>
    );

describe('vista admin de perfil', () => {
    beforeEach(() => {
        localStorage.clear();
        navigateMock.mockClear();
    });

    it('muestra los datos de la sesión activa', () => {
        localStorage.setItem('usuario_activo', JSON.stringify({ nombre: 'Administrador', correo: 'admin@gmail.com', tipo: 'Administrador' }));
        renderizar();
        expect(screen.getByRole('heading', { name: 'Administrador' })).toBeInTheDocument();
        expect(screen.getByDisplayValue('admin@gmail.com')).toBeInTheDocument();
    });

    it('muestra que no hay sesión activa cuando nadie inició sesión', () => {
        renderizar();
        expect(screen.getByText(/sin sesión activa/i)).toBeInTheDocument();
    });

    it('cierra la sesión y redirige al inicio', () => {
        localStorage.setItem('usuario_activo', JSON.stringify({ nombre: 'Administrador', correo: 'admin@gmail.com', tipo: 'Administrador' }));
        renderizar();
        fireEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
        expect(localStorage.getItem('usuario_activo')).toBeNull();
        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});