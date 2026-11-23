import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarProductos from '../../views/admin/mostrarproductos';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: { listarProductos: vi.fn(), eliminarProducto: vi.fn() }
}));

const catalogo = [
    { id: 1, nombre: 'PlayStation 2', precio: 60000, stock: 4, imagenUrl: '/ps2.jpg' },
    { id: 7, nombre: 'Super Mario 64', precio: 55000, stock: 10, imagenUrl: '/sm64.jpg' }
];

const renderizar = () => render(<MemoryRouter><MostrarProductos /></MemoryRouter>);

describe('vista admin de mostrar productos', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.listarProductos.mockResolvedValue(catalogo);
    });

    it('lista cada producto del catálogo con su precio', async () => {
        renderizar();
        expect(await screen.findByText('PlayStation 2')).toBeInTheDocument();
        expect(screen.getByText('CLP$60000')).toBeInTheDocument();
        expect(screen.getByText('Super Mario 64')).toBeInTheDocument();
        expect(screen.getByText('CLP$55000')).toBeInTheDocument();
    });

    it('cada botón Editar lleva a la página del producto correspondiente', async () => {
        renderizar();
        const enlaces = await screen.findAllByRole('link', { name: 'Editar' });
        expect(enlaces[0]).toHaveAttribute('href', '/admin/editarprod/1');
        expect(enlaces[1]).toHaveAttribute('href', '/admin/editarprod/7');
    });

    it('pide confirmación y permite cancelar el borrado', async () => {
        renderizar();
        fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[0]);
        expect(screen.getByText(/¿seguro que deseas borrar el producto "PlayStation 2"/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(screen.queryByText(/¿seguro que deseas borrar/i)).not.toBeInTheDocument();
        expect(AdminService.eliminarProducto).not.toHaveBeenCalled();
    });

    it('borra el producto al confirmar y lo quita de la lista', async () => {
        AdminService.eliminarProducto.mockResolvedValue({ exito: true });
        renderizar();
        fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[0]);
        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botones[botones.length - 1]);

        await waitFor(() => expect(screen.queryByText('PlayStation 2')).not.toBeInTheDocument());
        expect(AdminService.eliminarProducto).toHaveBeenCalledWith(1);
        expect(screen.getByText('Super Mario 64')).toBeInTheDocument();
    });

    it('muestra el error del backend si el producto no se puede borrar', async () => {
        AdminService.eliminarProducto.mockRejectedValue({
            response: { data: { error: 'No se puede eliminar el producto porque está asociado a órdenes' } }
        });
        renderizar();
        fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[0]);
        const botones = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botones[botones.length - 1]);

        expect(await screen.findByText(/asociado a órdenes/i)).toBeInTheDocument();
        expect(screen.getByText('PlayStation 2')).toBeInTheDocument();
    });
});

