import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearUsuario from '../../views/admin/crearusuario';
import { datosUbicacion } from '../../views/Registro';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { crearUsuario: vi.fn() }
}));

const llenar = (container, id, valor) =>
    fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });

const completarFormulario = (container, correo) => {
    llenar(container, 'r-run', '12345678');
    llenar(container, 'r-nombre', 'Ana');
    llenar(container, 'r-apellidos', 'Pérez');
    llenar(container, 'r-correo', correo);
    llenar(container, 'r-passw', '1234');
    llenar(container, 'r-telf', '999999999');
    llenar(container, 'r-fecha', '2000-01-01');
    llenar(container, 'r-direccion', 'Calle 1');
    llenar(container, 'r-reg', '0');
    llenar(container, 'r-comu', datosUbicacion[0].comunas[0]);
};

const renderizar = () =>
    render(
        <MemoryRouter>
            <CrearUsuario />
        </MemoryRouter>
    );

describe('vista admin de crear usuario', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('rechaza un correo con dominio no permitido y no llama al backend', () => {
        const { container } = renderizar();
        completarFormulario(container, 'ana@hotmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(screen.getByText(/solo se permiten correos/i)).toBeInTheDocument();
        expect(AdminService.crearUsuario).not.toHaveBeenCalled();
    });

    it('envía al usuario al backend como CLIENTE y muestra el aviso de éxito', async () => {
        AdminService.crearUsuario.mockResolvedValue({ id: 9 });
        const { container } = renderizar();
        completarFormulario(container, 'ana@gmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(await screen.findByText('Usuario creado con éxito.')).toBeInTheDocument();
        expect(AdminService.crearUsuario).toHaveBeenCalledWith(
            expect.objectContaining({
                correo: 'ana@gmail.com', password: '1234', rol: 'CLIENTE',
                direccionDefecto: 'Calle 1', region: datosUbicacion[0].region
            })
        );
    });

    it('muestra el error del backend cuando el correo ya está registrado', async () => {
        AdminService.crearUsuario.mockRejectedValue({ response: { data: { error: 'Ya existe un usuario con el correo ana@gmail.com' } } });
        const { container } = renderizar();
        completarFormulario(container, 'ana@gmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(await screen.findByText(/ya existe un usuario con el correo/i)).toBeInTheDocument();
    });
});