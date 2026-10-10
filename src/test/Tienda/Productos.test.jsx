import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../../views/Productos';
import { ProveedorCarrito } from '../../contexto/ContextoCarrito';

describe('Vista Productos', () => {
  it('renderiza el catalogo disponible', () => {
    render(
      <ProveedorCarrito>
        <MemoryRouter>
          <Productos />
        </MemoryRouter>
      </ProveedorCarrito>
    );
    expect(screen.getByText('Catalogo disponible')).toBeInTheDocument();
  });
});