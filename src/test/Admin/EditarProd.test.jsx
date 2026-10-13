import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarProd from '../../views/admin/editarprod';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const producto = {
    id: 1, codigo: 'BAR000001', nombre: 'PlayStation 2', precio: 60000, stock: 4,
    stockCritico: 2, categoria: 'Consolas', img: '/ps2.jpg', desc: ''
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
        localStorage.clear();
        localStorage.setItem('catalogo_retro', JSON.stringify([producto]));
        localStorage.setItem('categorias_retro', JSON.stringify(['Consolas', 'Juegos']));
        navigateMock.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('carga los datos del producto en el formulario', () => {
        renderizar(1);
        expect(screen.getByDisplayValue('PlayStation 2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('BAR000001')).toBeInTheDocument();
    });

    it('guarda el nuevo precio y stock, muestra el aviso y redirige', () => {
        vi.useFakeTimers();
        const { container } = renderizar(1);
        fireEvent.change(container.querySelector('[name="precio"]'), { target: { value: '55000' } });
        fireEvent.change(container.querySelector('[name="stock"]'), { target: { value: '9' } });
        fireEvent.click(screen.getByRole('button', { name: /actualizar/i }));
        expect(JSON.parse(localStorage.getItem('catalogo_retro'))[0]).toMatchObject({ precio: 55000, stock: 9 });
        expect(screen.getByText('¡Producto actualizado con éxito!')).toBeInTheDocument();
        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(navigateMock).toHaveBeenCalledWith('/admin/mostrarproductos');
    });

    it('muestra un aviso cuando el producto no existe', () => {
        renderizar(99);
        expect(screen.getByText(/producto no encontrado/i)).toBeInTheDocument();
    });
});