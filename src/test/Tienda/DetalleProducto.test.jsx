import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleProducto from '../../views/DetalleProducto';
import { ProveedorCarrito } from '../../contexto/ContextoCarrito';

describe('Vista de DetalleProducto', () => {
  it('renderiza la información de un producto específicos', () => {
    render(
      <ProveedorCarrito>
        <MemoryRouter initialEntries={['/detalleprod/1']}>
          <Routes>
            <Route path="/detalleprod/:id" element={<DetalleProducto />} />
          </Routes>
        </MemoryRouter>
      </ProveedorCarrito>
    );

    const productElements = screen.getAllByText(/playstation 2/i);
    expect(productElements.length).toBeGreaterThan(0);
  });
});