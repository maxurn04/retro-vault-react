import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarProd from '../../views/admin/editarprod';
import AdminService from '../../services/AdminService';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

vi.mock('../../services/AdminService', () => ({
    default: {
        obtenerProductoPorId: vi.fn(),
        listarCategorias: vi.fn(),
        actualizarProducto: vi.fn()
    }
}));

const producto = {
    id: 1, codigo: 'BAR000001', nombre: 'PlayStation 2', precio: 60000, stock: 4,
    stockCritico: 2, categoria: { id: 1, nombre: 'Consolas' }, imagenUrl: '/ps2.jpg', descripcion: '',
    esOferta: true, precioOferta: 50000
};

const renderizar = (id) =>
    render(
        <MemoryRouter initialEntries={[`/admin/editarprod/${id}`]}>
            <Routes>
                <Route path="/admin/editarprod/:id" element={<EditarProd />} />
            </Routes>
        </MemoryRouter>
    );

describe('vista admin de editar producto', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        AdminService.obtenerProductoPorId.mockResolvedValue(producto);
        AdminService.listarCategorias.mockResolvedValue([
            { id: 1, nombre: 'Consolas' },
            { id: 2, nombre: 'Juegos' }
        ]);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('carga los datos del producto en el formulario', async () => {
        renderizar(1);
        expect(await screen.findByDisplayValue('PlayStation 2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('BAR000001')).toBeInTheDocument();
    });

    it('guarda el nuevo precio y stock conservando la oferta, muestra el aviso y redirige', async () => {
        AdminService.actualizarProducto.mockResolvedValue(producto);
        const { container } = renderizar(1);
        await screen.findByDisplayValue('PlayStation 2');
        vi.useFakeTimers();

        fireEvent.change(container.querySelector('[name="precio"]'), { target: { value: '55000' } });
        fireEvent.change(container.querySelector('[name="stock"]'), { target: { value: '9' } });
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));
        });

        expect(AdminService.actualizarProducto).toHaveBeenCalledWith(
            '1',
            expect.objectContaining({ precio: 55000, stock: 9, esOferta: true, precioOferta: 50000, categoria: { id: 1 } })
        );
        expect(screen.getByText('¡Producto actualizado con éxito!')).toBeInTheDocument();
        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(navigateMock).toHaveBeenCalledWith('/admin/mostrarproductos');
    });

    it('muestra un aviso cuando el producto no existe', async () => {
        AdminService.obtenerProductoPorId.mockRejectedValue({ response: { status: 404 } });
        renderizar(99);
        expect(await screen.findByText(/producto no encontrado/i)).toBeInTheDocument();
    });
});