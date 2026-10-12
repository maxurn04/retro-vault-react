import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ofertas from '../../views/Ofertas';
import { ProveedorCarrito } from '../../contexto/ContextoCarrito';

describe('Vista Ofertas', () => {
  it('COMPROBANDO QUE OFERTAS FUNCIONE!!', () => {
    render(
      <ProveedorCarrito>
        <MemoryRouter>
          <Ofertas />
        </MemoryRouter>
      </ProveedorCarrito>
    );

    expect(screen.getByText(/ofertas especiales/i)).toBeInTheDocument();
  });
});