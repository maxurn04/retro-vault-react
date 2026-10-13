import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarUsuario from '../../views/admin/editarusuario';
import { datosUbicacion } from '../../views/Registro';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const usuario = {
    run: '12345678', nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com', contra: '1234',
    telefono: '999999999', fechaNacimiento: '2000-01-01', direccion: 'Calle 1',
    region: datosUbicacion[0].region, comuna: datosUbicacion[0].comunas[0], tipo: 'Cliente'
};

const renderizar = (indice) =>
    render(
        <MemoryRouter initialEntries={[`/admin/editarusuario/${indice}`]}>
            <Routes>
                <Route path="/admin/editarusuario/:indice" element={<EditarUsuario />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de editar usuario', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('lista_usuarios', JSON.stringify([usuario]));
        navigateMock.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('carga los datos del usuario en el formulario', () => {
        renderizar(0);
        expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
        expect(screen.getByDisplayValue('ana@gmail.com')).toBeInTheDocument();
    });

    it('guarda los cambios, muestra el aviso y redirige al listado', () => {
        vi.useFakeTimers();
        renderizar(0);
        fireEvent.change(screen.getByDisplayValue('Ana'), { target: { value: 'Carla' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
        expect(JSON.parse(localStorage.getItem('lista_usuarios'))[0].nombre).toBe('Carla');
        expect(screen.getByText('Usuario actualizado con éxito.')).toBeInTheDocument();
        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(navigateMock).toHaveBeenCalledWith('/admin/mostrarusuario');
    });

    it('muestra un aviso cuando el usuario no existe', () => {
        renderizar(5);
        expect(screen.getByText(/usuario no encontrado/i)).toBeInTheDocument();
    });
});