import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MostrarCategorias from '../../views/admin/mostrarcategorias';
import AdminService from '../../services/AdminService';

vi.mock('../../services/AdminService', () => ({
    default: {
        listarCategorias: vi.fn(),
        listarProductos: vi.fn(),
        buscarCategoriaPorNombre: vi.fn(),
        eliminarCategoria: vi.fn()
    }
}));

const juegos = { id: 1, nombre: 'Juegos' };
const vacia = { id: 2, nombre: 'Vacia' };
const producto = { id: 1, nombre: 'Zelda 64', stock: 5, precio: 30000, categoria: { id: 1, nombre: 'Juegos' }, imagenUrl: '/z.jpg' };

const renderizar = () =>
    render(
        <MemoryRouter>
            <MostrarCategorias />
        </MemoryRouter>
    );

describe('vista admin de categorías', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.listarCategorias.mockResolvedValue([juegos, vacia]);
        AdminService.listarProductos.mockResolvedValue([producto]);
    });

    it('muestra cada categoría con sus productos', async () => {
        renderizar();
        expect(await screen.findByText('Zelda 64')).toBeInTheDocument();
        expect(screen.getByText(/sin productos en esta categoría/i)).toBeInTheDocument();
    });

    it('deshabilita el botón Borrar si la categoría tiene productos', async () => {
        renderizar();
        const botones = await screen.findAllByRole('button', { name: 'Borrar' });
        expect(botones[0]).toBeDisabled();
        expect(botones[1]).toBeEnabled();
    });

    it('pide confirmación con un modal antes de borrar y permite cancelar', async () => {
        renderizar();
        fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[1]);
        expect(screen.getByText(/¿seguro que deseas borrar la categoría "Vacia"/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
        expect(screen.queryByText(/¿seguro que deseas borrar/i)).not.toBeInTheDocument();
        expect(AdminService.eliminarCategoria).not.toHaveBeenCalled();
    });

    it('borra la categoría vacía al confirmar', async () => {
        AdminService.eliminarCategoria.mockResolvedValue({ exito: true });
        renderizar();
        fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[1]);
        const botonesModal = screen.getAllByRole('button', { name: 'Borrar' });
        fireEvent.click(botonesModal[botonesModal.length - 1]);

        await waitFor(() => expect(AdminService.eliminarCategoria).toHaveBeenCalledWith(2));
        await waitFor(() => expect(screen.queryByText('Vacia')).not.toBeInTheDocument());
    });

    it('busca una categoría por nombre y muestra solo esa', async () => {
        AdminService.buscarCategoriaPorNombre.mockResolvedValue(vacia);
        renderizar();
        await screen.findByText('Zelda 64');

        fireEvent.change(screen.getByLabelText(/buscar categoría por nombre/i), { target: { value: 'vacia' } });
        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

        await waitFor(() => expect(screen.queryByText('Zelda 64')).not.toBeInTheDocument());
        expect(AdminService.buscarCategoriaPorNombre).toHaveBeenCalledWith('vacia');
        expect(screen.getByText('Vacia')).toBeInTheDocument();
    });

    it('avisa cuando la búsqueda no encuentra la categoría y Limpiar restaura el listado', async () => {
        AdminService.buscarCategoriaPorNombre.mockRejectedValue({ response: { status: 404 } });
        renderizar();
        await screen.findByText('Zelda 64');

        fireEvent.change(screen.getByLabelText(/buscar categoría por nombre/i), { target: { value: 'nada' } });
        fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
        expect(await screen.findByText(/no se encontró ninguna categoría/i)).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
        expect(screen.getByText('Zelda 64')).toBeInTheDocument();
    });
});
