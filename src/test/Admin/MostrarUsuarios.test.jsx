import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarUsuarios from '../../views/admin/mostrarusuario';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { listarUsuarios: vi.fn(), actualizarUsuario: vi.fn(), eliminarUsuario: vi.fn() }
}));

const usuario = {
    id: 5, run: '12345678', nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com',
    telefono: '999999999', fechaNacimiento: '2000-01-01', direccionDefecto: 'Calle 1',
    region: 'Metropolitana', comuna: 'Santiago', rol: 'CLIENTE'
};
const otro = { ...usuario, id: 6, run: '87654321', nombre: 'Luis', correo: 'luis@gmail.com' };

const renderizar = () =>
    render(
        <MemoryRouter>
            <MostrarUsuarios />
        </MemoryRouter>
    );

describe('vista admin de mostrar usuarios', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.listarUsuarios.mockResolvedValue([usuario, otro]);
    });

    it('lista todos los usuarios del backend', async () => {
        renderizar();
        expect(await screen.findByText('12345678')).toBeInTheDocument();
        expect(screen.getByText('ana@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('87654321')).toBeInTheDocument();
        expect(screen.getByText('luis@gmail.com')).toBeInTheDocument();
    });

    it('carga los datos del usuario en el formulario al hacer clic en su fila', async () => {
        renderizar();
        fireEvent.click(await screen.findByText('12345678'));
        expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Calle 1')).toBeInTheDocument();
    });

    it('guarda los cambios en el backend y muestra el aviso', async () => {
        AdminService.actualizarUsuario.mockResolvedValue({ ...usuario, nombre: 'Carla' });
        renderizar();
        fireEvent.click(await screen.findByText('12345678'));
        fireEvent.change(screen.getByDisplayValue('Ana'), { target: { value: 'Carla' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
        expect(await screen.findByText('Usuario editado.')).toBeInTheDocument();
        expect(AdminService.actualizarUsuario).toHaveBeenCalledWith(5, expect.objectContaining({ nombre: 'Carla', direccionDefecto: 'Calle 1' }));
        expect(AdminService.actualizarUsuario.mock.calls[0][1].password).toBeUndefined();
    });

    it('borra al usuario seleccionado', async () => {
        AdminService.eliminarUsuario.mockResolvedValue({ exito: true });
        renderizar();
        fireEvent.click(await screen.findByText('12345678'));
        fireEvent.click(screen.getByRole('button', { name: /borrar usuario/i }));
        expect(await screen.findByText('Usuario borrado.')).toBeInTheDocument();
        expect(AdminService.eliminarUsuario).toHaveBeenCalledWith(5);
        expect(screen.queryByText('ana@gmail.com')).not.toBeInTheDocument();
    });

    it('muestra el error del backend si no se puede borrar', async () => {
        AdminService.eliminarUsuario.mockRejectedValue({ response: { data: { error: 'No se puede eliminar un usuario que tiene órdenes asociadas' } } });
        renderizar();
        fireEvent.click(await screen.findByText('12345678'));
        fireEvent.click(screen.getByRole('button', { name: /borrar usuario/i }));
        expect(await screen.findByText(/órdenes asociadas/i)).toBeInTheDocument();
        expect(screen.getByText('ana@gmail.com')).toBeInTheDocument();
    });
});