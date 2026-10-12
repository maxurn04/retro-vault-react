import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CrearProd from '../../views/admin/crearprod';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal()),
    useNavigate: () => navigateMock
}));

const llenar = (container, nombre, valor) =>
    fireEvent.change(container.querySelector(`[name="${nombre}"]`), { target: { value: valor } });

describe('vista admin de crear producto', () => {
    beforeEach(() => {
        localStorage.clear();
        localStorage.setItem('catalogo_retro', JSON.stringify([{ id: 1, nombre: 'Base', stock: 1, precio: 1 }]));
        localStorage.setItem('categorias_retro', JSON.stringify(['Consolas', 'Juegos']));
        navigateMock.mockClear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('carga las categorías guardadas como opciones del select', () => {
        render(<MemoryRouter><CrearProd /></MemoryRouter>);
        expect(screen.getByRole('option', { name: 'Consolas' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Juegos' })).toBeInTheDocument();
    });
alert
    it('guarda el producto con el siguiente id y muestra el aviso', () => {
        const alertaSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        const { container } = render(<MemoryRouter><CrearProd /></MemoryRouter>);

        llenar(container, 'nombre', 'Mario Kart 64');
        llenar(container, 'codigo', 'BAR000099');
        llenar(container, 'precio', '25000');
        llenar(container, 'stock', '4');
        llenar(container, 'categoria', 'Juegos');
        fireEvent.click(screen.getByRole('button', { name: /registrar/i }));

        const catalogo = JSON.parse(localStorage.getItem('catalogo_retro'));
        expect(catalogo).toHaveLength(2);
        expect(catalogo[1]).toMatchObject({ id: 2, nombre: 'Mario Kart 64', precio: 25000, stock: 4, categoria: 'Juegos' });
        expect(screen.getByText('Producto creado.')).toBeInTheDocument();
        expect(alertaSpy).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(navigateMock).toHaveBeenCalledWith('/admin/mostrarproductos');
    });
});