import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { ProveedorUsuario } from '../../contexto/ContextoUsuario';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const renderizar = (ruta) =>
    render(
        <ProveedorUsuario>
            <MemoryRouter initialEntries={[ruta]}>
                <Routes>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<p>Contenido del dashboard</p>} />
                        <Route path="mostrarproductos" element={<p>Contenido de productos</p>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </ProveedorUsuario>
    );

describe('componente AdminLayout', () => {
    beforeEach(() => {
        localStorage.clear();
        navigateMock.mockClear();
    });

    it('muestra la página hija de la ruta dentro del layout', () => {
        renderizar('/admin/mostrarproductos');
        expect(screen.getByText('Contenido de productos')).toBeInTheDocument();
        expect(screen.queryByText('Contenido del dashboard')).not.toBeInTheDocument();
    });

    it('marca como activo solo el enlace de la página actual', () => {
        renderizar('/admin/mostrarproductos');
        expect(screen.getByRole('link', { name: 'Productos' })).toHaveClass('active');
        expect(screen.getByRole('link', { name: 'Usuarios' })).not.toHaveClass('active');
    });

    it('cierra la sesión y redirige al inicio', () => {
        localStorage.setItem('usuario_activo', JSON.stringify({ nombre: 'Administrador', tipo: 'Administrador' }));
        renderizar('/admin');
        fireEvent.click(screen.getByRole('button', { name: /cerrar sesión/i }));
        expect(localStorage.getItem('usuario_activo')).toBeNull();
        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});