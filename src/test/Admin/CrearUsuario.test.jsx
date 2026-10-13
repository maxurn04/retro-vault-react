import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearUsuario from '../../views/admin/crearusuario';
import { datosUbicacion } from '../../views/Registro';

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
        localStorage.clear();
    });

    it('rechaza un correo con dominio no permitido y no guarda al usuario', () => {
        const { container } = renderizar();
        completarFormulario(container, 'ana@hotmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(screen.getByText(/solo se permiten correos/i)).toBeInTheDocument();
        expect(localStorage.getItem('lista_usuarios')).toBeNull();
    });

    it('guarda al usuario como Cliente y muestra el aviso de éxito', () => {
        const { container } = renderizar();
        completarFormulario(container, 'ana@gmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        const usuarios = JSON.parse(localStorage.getItem('lista_usuarios'));
        expect(usuarios).toHaveLength(1);
        expect(usuarios[0]).toMatchObject({ correo: 'ana@gmail.com', tipo: 'Cliente', region: datosUbicacion[0].region });
        expect(screen.getByText('Usuario creado con éxito.')).toBeInTheDocument();
    });

    it('rechaza un correo que ya está registrado', () => {
        localStorage.setItem('lista_usuarios', JSON.stringify([{ correo: 'ana@gmail.com' }]));
        const { container } = renderizar();
        completarFormulario(container, 'ana@gmail.com');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        expect(screen.getByText(/ya existe un usuario registrado/i)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('lista_usuarios'))).toHaveLength(1);
    });
});