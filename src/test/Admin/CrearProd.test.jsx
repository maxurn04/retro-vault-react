import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearProd from '../../views/admin/crearprod';
import AdminService from '../../services/AdminService';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

vi.mock('../../services/AdminService', () => ({
    default: { listarCategorias: vi.fn(), crearProducto: vi.fn() }
}));

const llenar = (container, nombre, valor) =>
    fireEvent.change(container.querySelector(`[name="${nombre}"]`), { target: { value: valor } });

describe('vista admin de crear producto', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.listarCategorias.mockResolvedValue([
            { id: 1, nombre: 'Consolas' },
            { id: 2, nombre: 'Juegos' }
        ]);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('carga las categorías del backend como opciones del select', async () => {
        render(<MemoryRouter><CrearProd /></MemoryRouter>);
        expect(await screen.findByRole('option', { name: 'Consolas' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Juegos' })).toBeInTheDocument();
    });

    it('envía el producto al backend, muestra el aviso y redirige', async () => {
        AdminService.crearProducto.mockResolvedValue({ id: 2 });
        const { container } = render(<MemoryRouter><CrearProd /></MemoryRouter>);
        await screen.findByRole('option', { name: 'Juegos' });
        vi.useFakeTimers();

        llenar(container, 'nombre', 'Mario Kart 64');
        llenar(container, 'codigo', 'BAR000099');
        llenar(container, 'precio', '25000');
        llenar(container, 'stock', '4');
        llenar(container, 'categoria', '2');
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /registrar/i }));
        });

        expect(AdminService.crearProducto).toHaveBeenCalledWith(
            expect.objectContaining({ nombre: 'Mario Kart 64', precio: 25000, stock: 4, categoria: { id: 2 } })
        );
        expect(screen.getByText('Producto creado.')).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(navigateMock).toHaveBeenCalledWith('/admin/mostrarproductos');
    });

    it('muestra el error del backend si no se puede crear', async () => {
        AdminService.crearProducto.mockRejectedValue({ response: { data: { error: 'Ya existe un producto con el código BAR000099' } } });
        const { container } = render(<MemoryRouter><CrearProd /></MemoryRouter>);
        await screen.findByRole('option', { name: 'Juegos' });

        llenar(container, 'nombre', 'Mario Kart 64');
        llenar(container, 'codigo', 'BAR000099');
        llenar(container, 'precio', '25000');
        llenar(container, 'stock', '4');
        llenar(container, 'categoria', '2');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

        expect(await screen.findByText(/ya existe un producto con el código/i)).toBeInTheDocument();
        expect(navigateMock).not.toHaveBeenCalled();
    });
});
