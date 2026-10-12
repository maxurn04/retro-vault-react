import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarUsuarios from '../../views/admin/mostrarusuario';

const usuario = {
    run: '12345678', nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com', contra: '1234',
    telefono: '999999999', fechaNacimiento: '2000-01-01', direccion: 'Calle 1',
    region: 'Metropolitana', comuna: 'Santiago', tipo: 'Cliente'
};

const renderizar = () =>
    render(
        <MemoryRouter>
            <MostrarUsuarios />
        </MemoryRouter>
    );

describe('vista admin de mostrar usuarios', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('lista_usuarios', JSON.stringify([usuario]));
    });

    it('lista los usuarios registrados', () => {
        renderizar();
        expect(screen.getByText('12345678')).toBeInTheDocument();
        expect(screen.getByText('ana@gmail.com')).toBeInTheDocument();
    });

    it('carga los datos del usuario en el formulario al hacer clic en su fila', () => {
        renderizar();
        fireEvent.click(screen.getByText('12345678'));
        expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Calle 1')).toBeInTheDocument();
    });

    it('guarda los cambios y muestra el aviso en la página', () => {
        renderizar();
        fireEvent.click(screen.getByText('12345678'));
        fireEvent.change(screen.getByDisplayValue('Ana'), { target: { value: 'Carla' } });
        fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
        expect(JSON.parse(localStorage.getItem('lista_usuarios'))[0].nombre).toBe('Carla');
        expect(screen.getByText('Usuario editado.')).toBeInTheDocument();
    });

    it('borra al usuario seleccionado', () => {
        renderizar();
        fireEvent.click(screen.getByText('12345678'));
        fireEvent.click(screen.getByRole('button', { name: /borrar usuario/i }));
        expect(JSON.parse(localStorage.getItem('lista_usuarios'))).toHaveLength(0);
        expect(screen.getByText('Usuario borrado.')).toBeInTheDocument();
    });
});