import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ofertas from '../../views/Ofertas';
import { ContextoCarrito } from '../../contexto/ContextoCarrito';

describe('Vista Ofertas', () => {
  it('COMPROBANDO QUE OFERTAS FUNCIONE!!', () => {
    render(
      <ContextoCarrito.Provider value={{ agregarAlCarrito: vi.fn() }}>
        <MemoryRouter>
          <Ofertas />
        </MemoryRouter>
      </ContextoCarrito.Provider>
    );

    expect(screen.getByText(/ofertas especiales/i)).toBeInTheDocument();
  });

  it('renderiza la lista de productos en promoción', () => {
    render(
      <ContextoCarrito.Provider value={{ agregarAlCarrito: vi.fn() }}>
        <MemoryRouter>
          <Ofertas />
        </MemoryRouter>
      </ContextoCarrito.Provider>
    );
    const titulos = screen.getAllByRole('heading');
    expect(titulos.length).toBeGreaterThan(0);
  });
});